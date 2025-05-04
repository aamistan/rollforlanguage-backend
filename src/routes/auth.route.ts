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
          properties: {
            message: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                username: { type: 'string' },
                roleId: { type: 'string' },
              },
              required: ['id', 'email', 'username', 'roleId'],
            },
          },
          required: ['message', 'user'],
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
          properties: {
            token: { type: 'string' },
          },
          required: ['token'],
        },
      },
    },
    handler: loginHandler,
  });

  server.post('/refresh', {
    schema: {
      description: 'Refresh access token using refresh token',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
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
          properties: {
            token: { type: 'string' },
          },
          required: ['token'],
        },
      },
    },
    handler: refreshHandler,
  });

  server.post('/logout', {
    schema: {
      description: 'Log out of the current session (invalidate refresh token)',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
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
          properties: {
            message: { type: 'string' },
          },
          required: ['message'],
        },
      },
    },
    handler: logoutHandler,
  });

  server.post('/logout-all', {
    schema: {
      description: 'Log out from all sessions (invalidate all refresh tokens)',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
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
          properties: {
            message: { type: 'string' },
          },
          required: ['message'],
        },
      },
    },
    handler: globalLogoutHandler,
  });
}
