// src/services/auth.service.ts
import bcrypt from 'bcrypt';

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
