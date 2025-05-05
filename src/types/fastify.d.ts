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
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate(
      request: import('fastify').FastifyRequest,
      reply: import('fastify').FastifyReply
    ): Promise<void>;
  }

  interface FastifyRequest {
    hasPermission: (permission: string) => boolean;
  }
}
