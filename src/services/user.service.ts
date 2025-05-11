// src/services/user.service.ts

import { and, or, inArray, lte, gte, count, eq, ilike, sql } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema/core';
import { GetUsersQuery } from '../schemas/admin.schema';

interface UserListItem {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AdminUserListResponse {
  data: UserListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getUsersFromDB(query: GetUsersQuery): Promise<AdminUserListResponse> {
  const {
    search,
    role,
    roles,
    createdBefore,
    createdAfter,
    includeSuspended,
    includeCountOnly,
    page = 1,
    limit = 25,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = query;

  const offset = (page - 1) * limit;

  // ✅ Safety check: valid sort fields only
  const allowedSortFields = ['username', 'email', 'createdAt'] as const;
  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

  // 🧠 Dynamic WHERE clause
  const conditions = [];

  // Role filtering
  if (role) {
    conditions.push(eq(users.roleId, role));
  } else if (roles && roles.length > 0) {
    conditions.push(inArray(users.roleId, roles));
  }

  // Fuzzy search
  if (search) {
    const fuzzy = `%${search.toLowerCase()}%`;
    conditions.push(or(
      ilike(users.username, fuzzy),
      ilike(users.email, fuzzy)
    ));
  }

  // Created date filters
  if (createdAfter) {
    conditions.push(gte(users.createdAt, createdAfter));
  }

  if (createdBefore) {
    conditions.push(lte(users.createdAt, createdBefore));
  }

  // Inactive users toggle
  if (!includeSuspended) {
    conditions.push(eq(users.isActive, true));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 🧮 Count only mode
  if (includeCountOnly) {
    const [{ count: total }] = await db
      .select({ count: count() })
      .from(users)
      .where(whereClause);

    return {
      data: [],
      pagination: {
        total: Number(total),
        page,
        limit,
        totalPages: Math.ceil(Number(total) / limit),
      },
    };
  }

  // 📦 Fetch full paginated data
  const results = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.roleId,
      createdAt: sql<string>`DATE_FORMAT(${users.createdAt}, '%Y-%m-%d %H:%i:%s')`.as('createdAt'),
    })
    .from(users)
    .where(whereClause)
    .orderBy(
      sortOrder === 'desc'
        ? sql`${users[safeSortBy]} DESC`
        : sql`${users[safeSortBy]} ASC`
    )
    .limit(limit)
    .offset(offset);

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(users)
    .where(whereClause);

  return {
    data: results,
    pagination: {
      total: Number(total),
      page,
      limit,
      totalPages: Math.ceil(Number(total) / limit),
    },
  };
}
