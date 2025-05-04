import { FastifyRequest, FastifyReply } from 'fastify';
import { signupSchema, loginSchema } from '../schemas/auth.schema';
import { createUser, findUserByEmail, verifyPassword } from '../services/auth.service';
import '@fastify/jwt';

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

import { idGenerator } from '../utils/idGenerator';
import { db } from '../db';
import { refreshTokens } from '../db/schema/core';

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('Received /auth/login request');
  try {
    const parsed = loginSchema.parse(request.body);

    const user = await findUserByEmail(parsed.email);
    if (!user) {
      return reply.status(401).send({ error: 'Invalid email or password' });
    }

    const isValid = await verifyPassword(parsed.password, user.passwordHash);
    if (!isValid) {
      return reply.status(401).send({ error: 'Invalid email or password' });
    }

    // Generate access token (JWT)
    const accessToken = await reply.jwtSign({
      id: user.id,
      email: user.email,
      role: user.roleId,
    });

    // Generate refresh token
    const refreshToken = idGenerator(64);
    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 7); // valid for 7 days

    // Save refresh token in DB
    await db.insert(refreshTokens).values({
      id: idGenerator(),
      userId: user.id,
      token: refreshToken,
      expiresAt: refreshExpiry,
    });

    return reply.send({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    request.log.error(err);
    return reply.status(400).send({ error: 'Login failed' });
  }
}

