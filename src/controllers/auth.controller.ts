// src/controllers/auth.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { signupSchema } from '../schemas/auth.schema';
import { createUser } from '../services/auth.service'; // we'll make this next

export async function signupHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const parsed = signupSchema.parse(request.body);

    const user = await createUser(parsed);

    return reply.status(201).send({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        roleId: user.roleId,
      },
    });
  } catch (err) {
    request.log.error(err);
    return reply.status(400).send({ error: 'Invalid request or user creation failed' });
  }
}
