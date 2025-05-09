// src/types/fastify.d.ts

import 'fastify';
import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string;
      email: string;
      username: string;
      role: string;
    };
    user: {
      id: string;
      email: string;
      username: string;
      role: string;
      iat: number;
      exp: number;
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: import('fastify').FastifyRequest,
      reply: import('fastify').FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    /**
     * Checks if the user has the specified permission
     */
    hasPermission: (permission: string) => boolean;

    /**
     * Authenticated user payload (populated by JWT plugin)
     */
    user: {
      id: string;
      email: string;
      username: string;
      role: string;
      iat: number;
      exp: number;
    };
  }
}
