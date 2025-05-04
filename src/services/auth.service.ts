// src/services/auth.service.ts
import bcrypt from 'bcrypt';
import { db } from '../db';
import { users } from '../db/schema/core';
import { idGenerator } from '../utils/idGenerator';
import { eq } from 'drizzle-orm';

const SALT_ROUNDS = 12;

/**
 * Hash a plain text password.
 * @param plainTextPassword
 * @returns hashed password
 */
export async function hashPassword(plainTextPassword: string): Promise<string> {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

/**
 * Verify a plain text password against a hash.
 * @param plainTextPassword
 * @param hash
 * @returns true if match, false otherwise
 */
export async function verifyPassword(
  plainTextPassword: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hash);
}

/**
 * Create a new user in the database.
 * @param email, username, password
 * @returns created user object
 */
export async function createUser({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) {
  const hashedPassword = await hashPassword(password);

  const newUser = {
    id: idGenerator(16),
    email,
    username,
    passwordHash: hashedPassword,
    roleId: 'student', // default role
    isVerified: false,
    isActive: true,
  };

  await db.insert(users).values(newUser);

  return newUser;
}

export async function findUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0]; // return first user (email should be unique)
}

export async function findUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user || null;
}