// src/routes/auth.route.ts
import { FastifyInstance } from 'fastify';
import { signupHandler } from '../controllers/auth.controller';

export async function authRoutes(server: FastifyInstance) {
  server.post('/signup', signupHandler);
}
