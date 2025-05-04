// src/routes/auth.route.ts
import { FastifyInstance } from 'fastify';
import {
  loginHandler,
  signupHandler,
  refreshHandler,
  logoutHandler,
  globalLogoutHandler,
} from '../controllers/auth.controller';
import fromZodSchema from 'zod-to-json-schema';
import { signupSchema, loginSchema } from '../schemas/auth.schema';

export async function authRoutes(server: FastifyInstance) {
  server.post('/signup', {
    schema: {
      description: 'Create a new user account',
      tags: ['Auth'],
      body: fromZodSchema(signupSchema),
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
        },
      },
    },
    handler: signupHandler,
  });

  server.post('/login', {
    schema: {
      description: 'Log in with email and password',
      tags: ['Auth'],
      body: fromZodSchema(loginSchema),
      response: {
        200: {
          description: 'Successful login with JWT token',
          type: 'object',
        },
      },
    },
    handler: loginHandler,
  });

  server.post('/refresh', {
    schema: {
      description: 'Refresh access token using refresh token',
      tags: ['Auth'],
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
        },
        required: ['userId'],
      },
      response: {
        200: {
          description: 'New access token issued',
          type: 'object',
        },
      },
    },
    handler: refreshHandler,
  });

  server.post('/logout', {
    schema: {
      description: 'Log out of the current session (invalidate refresh token)',
      tags: ['Auth'],
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
        },
        required: ['userId'],
      },
      response: {
        200: {
          description: 'Successfully logged out',
          type: 'object',
        },
      },
    },
    handler: logoutHandler,
  });

  server.post('/logout-all', {
    schema: {
      description: 'Log out from all sessions (invalidate all refresh tokens)',
      tags: ['Auth'],
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
        },
        required: ['userId'],
      },
      response: {
        200: {
          description: 'Successfully logged out from all sessions',
          type: 'object',
        },
      },
    },
    handler: globalLogoutHandler,
  });
}
