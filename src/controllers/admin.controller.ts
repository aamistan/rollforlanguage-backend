// src/controllers/admin.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { hashPassword, findUserByEmail } from '../services/auth.service';
import { getUsersFromDB } from '../services/user.service'; // 🆕 DB fetch logic
import { db } from '../db';
import { users } from '../db/schema/core';
import { idGenerator } from '../utils/idGenerator';
import { GetUsersQuery } from '../schemas/admin.schema'; // 🆕 Zod-derived type

const allowedRolesByCreator: Record<string, string[]> = {
  superadmin: ['superadmin', 'admin', 'teacher', 'student'],
  admin: ['teacher', 'student'],
  teacher: ['student'],
};

export async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('Received /admin/users request');

  try {
    const { email, username, password, role } = request.body as {
      email?: string;
      username?: string;
      password?: string;
      role?: string;
    };

    const creator = request.user;

    if (!email || !username || !password || !role) {
      request.log.warn('Missing required fields in create user request');
      return reply.status(400).send({ error: 'Missing required fields: email, username, password, role.' });
    }

    const allowedRoles = allowedRolesByCreator[creator.role];
    if (!allowedRoles || !allowedRoles.includes(role)) {
      request.log.warn(`Role ${creator.role} not allowed to create user with role ${role}`);
      return reply.status(403).send({ error: `Your role (${creator.role}) cannot create a user with role '${role}'.` });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      request.log.warn(`Attempt to create duplicate user with email: ${email}`);
      return reply.status(400).send({ error: 'A user with this email already exists.' });
    }

    const hashedPassword = await hashPassword(password);

    await db.insert(users).values({
      id: idGenerator(),
      email,
      username,
      passwordHash: hashedPassword,
      roleId: role,
    });

    request.log.info(`User created successfully: ${email} (role: ${role})`);

    return reply.status(201).send({
      message: 'User created successfully.',
    });
  } catch (err) {
    request.log.error(`Error in createUserHandler: ${err}`);
    return reply.status(500).send({ error: 'Internal server error.' });
  }
}

// ✅ NEW: GET /admin/users handler
export async function getUsersHandler(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('Received GET /admin/users request');

  try {
    const query = request.query as GetUsersQuery;

    const result = await getUsersFromDB(query);

    return reply.status(200).send(result);
  } catch (err) {
    request.log.error(`Error in getUsersHandler: ${err}`);
    return reply.status(500).send({ error: 'Failed to retrieve users' });
  }
}
