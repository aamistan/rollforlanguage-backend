import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { users } from '../schema/core';
import { languages } from '../schema/lessons';
import { idGenerator } from '../../utils/idGenerator';

async function seed() {
  const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
      rejectUnauthorized: true,
    },
  });

  const db = drizzle(pool);

  try {
    console.log('🌱 Starting database seeding...');

    // Insert base languages
    await db.insert(languages).values([
      { id: idGenerator(), name: 'English', code: 'en' },
      { id: idGenerator(), name: 'German', code: 'de' },
    ]);
    console.log('✅ Inserted languages');

    console.log('🌱 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await pool.end(); // close the pool when done
  }
}

seed().then(() => process.exit());
