// src/config/env.ts

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('3000'),

  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  JWT_SECRET: z.string(),

  // ✅ Backblaze B2 integration
  B2_APPLICATION_KEY_ID: z.string(),
  B2_APPLICATION_KEY: z.string(),
  B2_BUCKET_NAME: z.string(),
  B2_PUBLIC_URL: z.string().url(), // must be a valid URL
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  console.error('❌ Invalid or missing environment variables:', envResult.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = envResult.data;
