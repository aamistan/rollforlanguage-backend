// src/services/characterClass.service.ts

import { db } from '../db';
import {
  characterClasses,
  classStatBonuses,
  classPassives,
  classTags,
  classTagLinks,
} from '../db/schema/character_classes';

import { and, ilike, eq, sql, count, inArray } from 'drizzle-orm';
import {
  CreateCharacterClassInput,
  UpdateCharacterClassInput,
  GetCharacterClassesQuery,
} from '../schemas/adminCharacter.schema';
import { idGenerator } from '../utils/idGenerator';

export async function getAllCharacterClasses(query: GetCharacterClassesQuery) {
  const {
    search,
    page = 1,
    limit = 25,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = query;

  const offset = (page - 1) * limit;
  const conditions = [];

  if (search) {
    const fuzzy = `%${search.toLowerCase()}%`;
    conditions.push(ilike(characterClasses.name, fuzzy));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 📦 Step 1: Get base classes
  const baseClasses = await db
    .select({
      id: characterClasses.id,
      name: characterClasses.name,
      description: characterClasses.description,
      lore: characterClasses.lore,
      iconUrl: characterClasses.iconUrl,
      isPlayable: characterClasses.isPlayable,
      createdAt: sql<string>`DATE_FORMAT(${characterClasses.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
      updatedAt: sql<string>`DATE_FORMAT(${characterClasses.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as('updatedAt'),
    })
    .from(characterClasses)
    .where(whereClause)
    .orderBy(
      sortOrder === 'desc'
        ? sql`${characterClasses[sortBy]} DESC`
        : sql`${characterClasses[sortBy]} ASC`
    )
    .limit(limit)
    .offset(offset);

  const classIds = baseClasses.map((cls) => cls.id);
  if (classIds.length === 0) {
    return {
      data: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    };
  }

  // 🧠 Step 2: Load all stat bonuses
  const allBonuses = await db
    .select()
    .from(classStatBonuses)
    .where(inArray(classStatBonuses.classId, classIds));

  const statMap: Record<string, Record<string, number>> = {};
  for (const bonus of allBonuses) {
    const classId = bonus.classId;
    const stat = bonus.statName;
    const value = bonus.statBonus ?? 0;
    if (!statMap[classId]) statMap[classId] = {};
    statMap[classId][stat] = value;
  }

  // 🧠 Step 3: Load all passives
  const allPassives = await db
    .select()
    .from(classPassives)
    .where(inArray(classPassives.classId, classIds));

  const passiveMap: Record<string, string[]> = {};
  for (const p of allPassives) {
    if (!passiveMap[p.classId]) passiveMap[p.classId] = [];
    passiveMap[p.classId].push(p.name);
  }

  // 🧠 Step 4: Load all tag links and join to tag names
  const allTags = await db
    .select({
      classId: classTagLinks.classId,
      tagName: classTags.name,
    })
    .from(classTagLinks)
    .innerJoin(classTags, eq(classTags.id, classTagLinks.tagId))
    .where(inArray(classTagLinks.classId, classIds));

  const tagMap: Record<string, string[]> = {};
  for (const tag of allTags) {
    if (!tagMap[tag.classId]) tagMap[tag.classId] = [];
    tagMap[tag.classId].push(tag.tagName);
  }

  // 🧩 Step 5: Combine everything into hydrated output
  const hydrated = baseClasses.map((cls) => ({
    ...cls,
    statBonuses: statMap[cls.id] || {},
    passiveAbilities: passiveMap[cls.id] || [],
    tags: tagMap[cls.id] || [],
  }));

  // 🧮 Count total
  const [{ count: total }] = await db
    .select({ count: count() })
    .from(characterClasses)
    .where(whereClause);

  return {
    data: hydrated,
    pagination: {
      total: Number(total),
      page,
      limit,
      totalPages: Math.ceil(Number(total) / limit),
    },
  };
}

export async function getCharacterClassById(id: string) {
  const [base] = await db
    .select()
    .from(characterClasses)
    .where(eq(characterClasses.id, id));

  if (!base) return null;

  // 🧠 Load stat bonuses and reduce to object
  const bonuses = await db
    .select({
      stat: classStatBonuses.statName,
      bonus: classStatBonuses.statBonus,
    })
    .from(classStatBonuses)
    .where(eq(classStatBonuses.classId, id));

  const statBonuses = bonuses.reduce((acc, curr) => {
    acc[curr.stat] = curr.bonus ?? 0;
    return acc;
  }, {} as Record<string, number>);

  // 🧠 Load passives and flatten to names only
  const passives = await db
    .select({ name: classPassives.name })
    .from(classPassives)
    .where(eq(classPassives.classId, id));

  const passiveAbilities = passives.map(p => p.name);

  // 🧠 Load tags via tag_links → tag names
  const tags = await db
    .select({ name: classTags.name })
    .from(classTagLinks)
    .innerJoin(classTags, eq(classTags.id, classTagLinks.tagId))
    .where(eq(classTagLinks.classId, id));

  const tagNames = tags.map(t => t.name);

  return {
    ...base,
    statBonuses,
    passiveAbilities,
    tags: tagNames,
  };
}

export async function createCharacterClass(input: CreateCharacterClassInput) {
  const now = new Date();
  const classId = idGenerator(36);

  // 1️⃣ Insert into character_classes
  await db.insert(characterClasses).values({
    id: classId,
    name: input.name,
    description: input.description,
    lore: input.lore,
    iconUrl: input.iconUrl,
    isPlayable: true,
    createdAt: now,
    updatedAt: now,
  });

  // 2️⃣ Insert stat bonuses
  const statEntries = Object.entries(input.statBonuses || {});
  if (statEntries.length > 0) {
    await db.insert(classStatBonuses).values(
      statEntries.map(([statName, bonus]) => ({
        id: idGenerator(36),
        classId,
        statName,
        statBonus: bonus ?? 0,
      }))
    );
  }

  // 3️⃣ Insert passives
  if (input.passiveAbilities?.length) {
    await db.insert(classPassives).values(
      input.passiveAbilities.map((name) => ({
        id: idGenerator(36),
        classId,
        name,
        effect: null, // Optional: expand later with detailed passive effect field
      }))
    );
  }

  // 4️⃣ Tags — find or create, then link
  if (input.tags?.length) {
    for (const tagName of input.tags) {
      // Check if tag exists
      const [existingTag] = await db
        .select({ id: classTags.id })
        .from(classTags)
        .where(eq(classTags.name, tagName));

      const tagId = existingTag?.id || idGenerator(36);

      // If tag doesn't exist, create it
      if (!existingTag) {
        await db.insert(classTags).values({
          id: tagId,
          name: tagName,
        });
      }

      // Link tag to class
      await db.insert(classTagLinks).values({
        id: idGenerator(36),
        classId,
        tagId,
      });
    }
  }

  // 5️⃣ Return hydrated class object
  return await getCharacterClassById(classId);
}

export async function updateCharacterClass(id: string, updates: UpdateCharacterClassInput) {
  const now = new Date();

  // 1️⃣ Update base class fields
  await db.update(characterClasses)
    .set({
      name: updates.name,
      description: updates.description,
      lore: updates.lore,
      iconUrl: updates.iconUrl,
      updatedAt: now,
    })
    .where(eq(characterClasses.id, id));

  // 2️⃣ Replace stat bonuses
  if (updates.statBonuses) {
    await db.delete(classStatBonuses).where(eq(classStatBonuses.classId, id));

    const statEntries = Object.entries(updates.statBonuses);
    if (statEntries.length > 0) {
      await db.insert(classStatBonuses).values(
        statEntries.map(([statName, bonus]) => ({
          id: idGenerator(36),
          classId: id,
          statName,
          statBonus: bonus ?? 0,
        }))
      );
    }
  }

  // 3️⃣ Replace passives
  if (updates.passiveAbilities) {
    await db.delete(classPassives).where(eq(classPassives.classId, id));

    if (updates.passiveAbilities.length > 0) {
      await db.insert(classPassives).values(
        updates.passiveAbilities.map((name) => ({
          id: idGenerator(36),
          classId: id,
          name,
          effect: null,
        }))
      );
    }
  }

  // 4️⃣ Replace tags
  if (updates.tags) {
    await db.delete(classTagLinks).where(eq(classTagLinks.classId, id));

    for (const tagName of updates.tags) {
      // Check if tag exists
      const [existingTag] = await db
        .select({ id: classTags.id })
        .from(classTags)
        .where(eq(classTags.name, tagName));

      const tagId = existingTag?.id || idGenerator(36);

      if (!existingTag) {
        await db.insert(classTags).values({
          id: tagId,
          name: tagName,
        });
      }

      await db.insert(classTagLinks).values({
        id: idGenerator(36),
        classId: id,
        tagId,
      });
    }
  }

  // 5️⃣ Return hydrated object
  return await getCharacterClassById(id);
}

export async function deleteCharacterClass(id: string): Promise<boolean> {
  // 🧭 Check existence first
  const [existing] = await db
    .select({ id: characterClasses.id })
    .from(characterClasses)
    .where(eq(characterClasses.id, id));

  if (!existing) return false;

  // 🧹 Cleanup relational data
  await db.delete(classStatBonuses).where(eq(classStatBonuses.classId, id));
  await db.delete(classPassives).where(eq(classPassives.classId, id));
  await db.delete(classTagLinks).where(eq(classTagLinks.classId, id));

  // 🗑️ Finally delete the class itself
  await db.delete(characterClasses).where(eq(characterClasses.id, id));

  return true;
}
