// src/plugins/jwt.plugin.ts
import { env } from '../config/env';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET || 'supersecretkey',
  });

  fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      request.log.error('JWT verification failed:', err);
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });
});
