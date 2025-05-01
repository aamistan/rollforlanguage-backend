import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { roles, users } from '../schema/core';
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

    // Insert base roles
    await db.insert(roles).values([
      { id: idGenerator(), name: 'Super Admin', description: 'Platform super administrator with full access' },
      { id: idGenerator(), name: 'Admin', description: 'Platform administrator' },
      { id: idGenerator(), name: 'Teacher', description: 'Teacher user' },
      { id: idGenerator(), name: 'Student', description: 'Student user' },
    ]);
    console.log('✅ Inserted roles');

    // Insert super admin user
    await db.insert(users).values({
      id: idGenerator(),
      username: 'AaronAdmin', // assuming you have this field
      email: 'stanley.aaron.m@gmail.com',
      passwordHash: '$2b$12$vxq.0Q3oujpfxCY/HoOWkOEQVjMKdsWx9ljSNa8KZeiJXhkKvusKC',
      roleId: 'superadmin', // or reference correct role ID
      displayName: 'Aaron Stanley',
    });
    console.log('✅ Inserted super admin user');

    // Insert admin user
    await db.insert(users).values({
      id: idGenerator(),
      username: 'admin', // assuming you have this field
      email: 'admin@example.com',
      passwordHash: '$2b$12$Wxv2nL/TM01WBIhJTQtRouRgj0xmoeSx6KyoEuoEEHbB7FCLjaEMy',
      roleId: 'admin', // or reference correct role ID
      displayName: 'Admin User',
    });
    console.log('✅ Inserted admin user');

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
