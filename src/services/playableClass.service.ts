// src/services/playableClass.service.ts

import { db } from '../db';
import {
  playableClasses,
  playableClassStatBonuses,
  playableClassPassives,
  playableTags,
  playableClassTagLinks,
} from '../db/schema/playable_classes';

import { and, ilike, eq, sql, count, inArray } from 'drizzle-orm';
import {
  CreatePlayableClassInput,
  UpdatePlayableClassInput,
  GetPlayableClassesQuery,
} from '../schemas/playable_classes';
import { idGenerator } from '../utils/idGenerator';

export async function getAllPlayableClasses(query: GetPlayableClassesQuery) {
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
    conditions.push(ilike(playableClasses.name, fuzzy));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 📦 Step 1: Get base classes
  const baseClasses = await db
    .select({
      id: playableClasses.id,
      name: playableClasses.name,
      description: playableClasses.description,
      lore: playableClasses.lore,
      iconUrl: playableClasses.iconUrl,
      isPlayable: playableClasses.isPlayable,
      createdAt: sql<string>`DATE_FORMAT(${playableClasses.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
      updatedAt: sql<string>`DATE_FORMAT(${playableClasses.updatedAt}, '%Y-%m-%d %H:%i:%s')`.as('updatedAt'),
    })
    .from(playableClasses)
    .where(whereClause)
    .orderBy(
      sortOrder === 'desc'
        ? sql`${playableClasses[sortBy]} DESC`
        : sql`${playableClasses[sortBy]} ASC`
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
    .from(playableClassStatBonuses)
    .where(inArray(playableClassStatBonuses.classId, classIds));

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
    .from(playableClassPassives)
    .where(inArray(playableClassPassives.classId, classIds));

  const passiveMap: Record<string, string[]> = {};
  for (const p of allPassives) {
    if (!passiveMap[p.classId]) passiveMap[p.classId] = [];
    passiveMap[p.classId].push(p.name);
  }

  // 🧠 Step 4: Load all tag links and join to tag names
  const allTags = await db
    .select({
      classId: playableClassTagLinks.classId,
      tagName: playableTags.name,
    })
    .from(playableClassTagLinks)
    .innerJoin(playableTags, eq(playableTags.id, playableClassTagLinks.tagId))
    .where(inArray(playableClassTagLinks.classId, classIds));

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
    .from(playableClasses)
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

export async function getPlayableClassById(id: string) {
  const [base] = await db
    .select()
    .from(playableClasses)
    .where(eq(playableClasses.id, id));

  if (!base) return null;

  // 🧠 Load stat bonuses and reduce to object
  const bonuses = await db
    .select({
      stat: playableClassStatBonuses.statName,
      bonus: playableClassStatBonuses.statBonus,
    })
    .from(playableClassStatBonuses)
    .where(eq(playableClassStatBonuses.classId, id));

  const statBonuses = bonuses.reduce((acc, curr) => {
    acc[curr.stat] = curr.bonus ?? 0;
    return acc;
  }, {} as Record<string, number>);

  // 🧠 Load passives and flatten to names only
  const passives = await db
    .select({ name: playableClassPassives.name })
    .from(playableClassPassives)
    .where(eq(playableClassPassives.classId, id));

  const passiveAbilities = passives.map(p => p.name);

  // 🧠 Load tags via tag_links → tag names
  const tags = await db
    .select({ name: playableTags.name })
    .from(playableClassTagLinks)
    .innerJoin(playableTags, eq(playableTags.id, playableClassTagLinks.tagId))
    .where(eq(playableClassTagLinks.classId, id));

  const tagNames = tags.map(t => t.name);

  return {
    ...base,
    statBonuses,
    passiveAbilities,
    tags: tagNames,
  };
}

export async function createPlayableClass(input: CreatePlayableClassInput) {
  const now = new Date();
  const classId = idGenerator(36);

  // 1️⃣ Insert into character_classes
  await db.insert(playableClasses).values({
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
    await db.insert(playableClassStatBonuses).values(
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
    await db.insert(playableClassPassives).values(
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
        .select({ id: playableTags.id })
        .from(playableTags)
        .where(eq(playableTags.name, tagName));

      const tagId = existingTag?.id || idGenerator(36);

      // If tag doesn't exist, create it
      if (!existingTag) {
        await db.insert(playableTags).values({
          id: tagId,
          name: tagName,
        });
      }

      // Link tag to class
      await db.insert(playableClassTagLinks).values({
        id: idGenerator(36),
        classId,
        tagId,
      });
    }
  }

  // 5️⃣ Return hydrated class object
  return await getPlayableClassById(classId);
}

export async function updatePlayableClass(id: string, updates: UpdatePlayableClassInput) {
  const now = new Date();

  // 1️⃣ Update base class fields
  await db.update(playableClasses)
    .set({
      name: updates.name,
      description: updates.description,
      lore: updates.lore,
      iconUrl: updates.iconUrl,
      updatedAt: now,
    })
    .where(eq(playableClasses.id, id));

  // 2️⃣ Replace stat bonuses
  if (updates.statBonuses) {
    await db.delete(playableClassStatBonuses).where(eq(playableClassStatBonuses.classId, id));

    const statEntries = Object.entries(updates.statBonuses);
    if (statEntries.length > 0) {
      await db.insert(playableClassStatBonuses).values(
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
    await db.delete(playableClassPassives).where(eq(playableClassPassives.classId, id));

    if (updates.passiveAbilities.length > 0) {
      await db.insert(playableClassPassives).values(
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
    await db.delete(playableClassTagLinks).where(eq(playableClassTagLinks.classId, id));

    for (const tagName of updates.tags) {
      // Check if tag exists
      const [existingTag] = await db
        .select({ id: playableTags.id })
        .from(playableTags)
        .where(eq(playableTags.name, tagName));

      const tagId = existingTag?.id || idGenerator(36);

      if (!existingTag) {
        await db.insert(playableTags).values({
          id: tagId,
          name: tagName,
        });
      }

      await db.insert(playableClassTagLinks).values({
        id: idGenerator(36),
        classId: id,
        tagId,
      });
    }
  }

  // 5️⃣ Return hydrated object
  return await getPlayableClassById(id);
}

export async function deletePlayableClass(id: string): Promise<boolean> {
  // 🧭 Check existence first
  const [existing] = await db
    .select({ id: playableClasses.id })
    .from(playableClasses)
    .where(eq(playableClasses.id, id));

  if (!existing) return false;

  // 🧹 Cleanup relational data
  await db.delete(playableClassStatBonuses).where(eq(playableClassStatBonuses.classId, id));
  await db.delete(playableClassPassives).where(eq(playableClassPassives.classId, id));
  await db.delete(playableClassTagLinks).where(eq(playableClassTagLinks.classId, id));

  // 🗑️ Finally delete the class itself
  await db.delete(playableClasses).where(eq(playableClasses.id, id));

  return true;
}
