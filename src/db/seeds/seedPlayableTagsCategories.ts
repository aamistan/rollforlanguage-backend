import { env } from '../../config/env';
import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { playableTagCategories } from '../../db/schema/playable_tags';
import { idGenerator } from '../../utils/idGenerator';

async function seedPlayableTagCategories() {
  const pool = mysql.createPool({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    ssl: {
      rejectUnauthorized: true,
    },
  });

  const db = drizzle(pool);

  try {
    console.log('🌱 Seeding playable tag categories...');

    const categoryData = [
      { name: 'class', displayName: 'Class', colorHex: '#E879F9', description: 'Official playable classes' },
      { name: 'species', displayName: 'Species', colorHex: '#FBBF24', description: 'Playable species and ancestries' },
      { name: 'combat-role', displayName: 'Combat Role', colorHex: '#F87171', description: 'Party role functions' },
      { name: 'combat-style', displayName: 'Combat Style', colorHex: '#60A5FA', description: 'How the class/spec deals damage' },
      { name: 'magic-type', displayName: 'Magic Type', colorHex: '#6366F1', description: 'Schools or types of magic' },
      { name: 'stat-affinity', displayName: 'Stat Affinity', colorHex: '#34D399', description: 'Primary stat associations' },
      { name: 'equipment', displayName: 'Equipment', colorHex: '#9CA3AF', description: 'Weapon or armor preferences' },
      { name: 'alignment', displayName: 'Alignment', colorHex: '#F472B6', description: 'Moral alignment' },
      { name: 'faction-lore', displayName: 'Faction Lore', colorHex: '#A78BFA', description: 'Heritage, origin, and lore tags' },
      { name: 'utility-skill', displayName: 'Utility Skill', colorHex: '#FCD34D', description: 'Support, dialogue, survival skills' },
      { name: 'theme-flavor', displayName: 'Theme / Flavor', colorHex: '#4ADE80', description: 'Aesthetic and roleplay labels' },
      { name: 'summoning-type', displayName: 'Summoning Type', colorHex: '#8B5CF6', description: 'Summon styles or magical themes' },
    ];

    const records = categoryData.map((cat, i) => ({
      id: idGenerator(),
      name: cat.name,
      displayName: cat.displayName,
      description: cat.description,
      colorHex: cat.colorHex,
      sortOrder: i,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.insert(playableTagCategories).values(records);

    console.log('✅ Inserted playable tag categories!');
  } catch (error) {
    console.error('❌ Error seeding tag categories:', error);
  } finally {
    await pool.end();
  }
}

seedPlayableTagCategories().then(() => process.exit());
