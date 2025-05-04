// src/schemas/auth.schema.ts
import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(100),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type LoginInput = z.infer<typeof loginSchema>;
