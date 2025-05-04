// src/routes/auth.route.ts
import { FastifyInstance } from 'fastify';
import { loginHandler, signupHandler, refreshHandler, logoutHandler, globalLogoutHandler } from '../controllers/auth.controller';

export async function authRoutes(server: FastifyInstance) {
  server.post('/signup', signupHandler);
  server.post('/login', loginHandler);
  server.post('/refresh', refreshHandler);
  server.post('/logout', logoutHandler);
  server.post('/logout-all', globalLogoutHandler);
}
