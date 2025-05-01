// src/db/seeds/seed.ts

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { generateId } from '../utils/idGenerator';
import { roles, users } from '../schema/core';
import { languages } from '../schema/lessons'; // adjust if located elsewhere

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

const db = drizzle(connection);

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Insert base roles
    await db.insert(roles).values([
      { id: generateId(), name: 'Super Admin', description: 'Platform super administrator with full access' },
      { id: generateId(), name: 'Admin', description: 'Platform administrator' },
      { id: generateId(), name: 'Teacher', description: 'Teacher user' },
      { id: generateId(), name: 'Student', description: 'Student user' },
    ]);
    console.log('✅ Inserted roles');

    // Insert super admin user (you!)
    await db.insert(users).values({
      id: generateId(),
      username: 'your-username-here', // replace with your actual username
      email: 'your-email@example.com', // replace with your real email
      passwordHash: 'supersecurehashedpassword', // replace with a properly hashed password
      roleId: 'superadmin', // must match the actual id inserted above
      displayName: 'Super Admin User',
    });
    console.log('✅ Inserted super admin user');

    // Insert admin user
    await db.insert(users).values({
      id: generateId(),
      username: 'adminuser',
      email: 'admin@example.com',
      passwordHash: 'hashedpassword123', // placeholder; replace securely
      roleId: 'admin',
      displayName: 'Admin User',
    });
    console.log('✅ Inserted admin user');

    // Insert base languages
    await db.insert(languages).values([
      { id: generateId(), name: 'English', code: 'en' },
      { id: generateId(), name: 'German', code: 'de' },
    ]);
    console.log('✅ Inserted languages');

    console.log('🌱 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
}

seed().then(() => process.exit());
