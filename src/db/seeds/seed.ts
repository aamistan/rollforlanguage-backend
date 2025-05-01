import 'dotenv/config';
import { roles, users } from '../schema/core';
import { languages } from '../schema/lessons'; // ✅ languages are defined in lessons.ts (or adjust if needed)
import { createClient } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

const client = createClient({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

const db = drizzle(client);


async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Insert base roles
    await db.insert(roles).values([
      { id: 'superadmin', name: 'Super Admin', description: 'Platform super administrator with full access' },
      { id: 'admin', name: 'Admin', description: 'Platform administrator' },
      { id: 'teacher', name: 'Teacher', description: 'Teacher user' },
      { id: 'student', name: 'Student', description: 'Student user' },
    ]);
    console.log('✅ Inserted roles');

    // Insert super admin user (you!)
    await db.insert(users).values({
      id: 'superadmin-user-id',
      email: 'superadmin@example.com',
      passwordHash: 'supersecurehashedpassword', // replace with a real hashed password!
      roleId: 'superadmin',
      displayName: 'Super Admin User',
    });
    console.log('✅ Inserted super admin user');

    // Insert admin user (general platform admin)
    await db.insert(users).values({
      id: 'admin-user-id',
      email: 'admin@example.com',
      passwordHash: 'hashedpassword123', // placeholder, replace securely
      roleId: 'admin',
      displayName: 'Admin User',
    });
    console.log('✅ Inserted admin user');

    // Insert base languages
    await db.insert(languages).values([
      { id: 'en', name: 'English', code: 'en' },
      { id: 'de', name: 'German', code: 'de' },
    ]);
    console.log('✅ Inserted languages');

    console.log('🌱 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
}

seed().then(() => process.exit());
