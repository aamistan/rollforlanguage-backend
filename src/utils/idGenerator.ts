// src/utils/idGenerator.ts
import crypto from 'crypto';

/**
 * Generates a secure random ID string.
 * @param length Desired string length (default 16 characters)
 * @returns Random hex string of given length
 */
export function generateSecureId(length = 16) {
  const byteLength = Math.ceil(length / 2);
  return crypto.randomBytes(byteLength).toString('hex').slice(0, length);
}
