// src/controllers/admin.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { hashPassword, findUserByEmail } from '../services/auth.service';
import { getUsersFromDB } from '../services/user.service';
import { db } from '../db';
import { users } from '../db/schema/core';
import { idGenerator } from '../utils/idGenerator';
import { getUsersQuerySchema } from '../schemas/admin.schema'; // Zod schema
import { GetUsersQuery } from '../schemas/admin.schema'; // Type for controller use
import { count, eq, gte } from 'drizzle-orm';

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
      return reply.status(400).send({
        error: 'Missing required fields: email, username, password, role.',
      });
    }

    const allowedRoles = allowedRolesByCreator[creator.role];
    if (!allowedRoles || !allowedRoles.includes(role)) {
      request.log.warn(`Role ${creator.role} not allowed to create user with role ${role}`);
      return reply.status(403).send({
        error: `Your role (${creator.role}) cannot create a user with role '${role}'.`,
      });
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

export async function getUsersHandler(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('Received GET /admin/users request');

  try {
    const parsed = getUsersQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      request.log.warn('Invalid query parameters');
      return reply.status(400).send({ error: 'Invalid query parameters' });
    }

    const {
      search,
      role,
      roles,
      page = 1,
      limit = 25,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      createdBefore,
      createdAfter,
      includeSuspended,
      includeCountOnly,
    } = parsed.data;

    const query: GetUsersQuery = {
      search,
      role,
      roles,
      page,
      limit,
      sortBy,
      sortOrder,
      createdBefore,
      createdAfter,
      includeSuspended,
      includeCountOnly,
    };

    const result = await getUsersFromDB(query);

    return reply.status(200).send(result);
  } catch (err) {
    request.log.error(`Error in getUsersHandler: ${err}`);
    return reply.status(500).send({ error: 'Failed to retrieve users' });
  }
}

export async function getUserMetricsHandler(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('Received GET /admin/users/metrics request');

  try {
    // Count total users
    const [{ count: totalUsers }] = await db
      .select({ count: count() })
      .from(users);

    // Count active users (is_active = true)
    const [{ count: activeUsers }] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.isActive, true));

    // Count suspended users (is_active = false)
    const [{ count: suspendedUsers }] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.isActive, false));

    // Count by role
    const rolesRaw = await db
      .select({ role: users.roleId, count: count() })
      .from(users)
      .groupBy(users.roleId);

    const roles: Record<string, number> = {};
    for (const row of rolesRaw) {
      roles[row.role] = Number(row.count);
    }

    // Count new users in past 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const [{ count: newUsersPast7Days }] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, sevenDaysAgo));

    return reply.status(200).send({
      totalUsers: Number(totalUsers),
      activeUsers: Number(activeUsers),
      suspendedUsers: Number(suspendedUsers),
      roles,
      newUsersPast7Days: Number(newUsersPast7Days),
    });
  } catch (err) {
    request.log.error(`Error in getUserMetricsHandler: ${err}`);
    return reply.status(500).send({ error: 'Failed to retrieve user metrics' });
  }
}
