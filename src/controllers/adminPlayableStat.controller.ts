// src/controllers/adminCharacterStat.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  getAllStats,
  createStat,
  updateStat,
  deleteStat,
  getStatById,
  setStatActiveState,
} from '../services/playableStat.service';

type StatQuery = { includeInactive?: string };

// GET /admin/playable/stats
export async function getAllStatsHandler(
  request: FastifyRequest<{ Querystring: StatQuery }>,
  reply: FastifyReply
) {
  const includeInactive = request.query.includeInactive === 'true';
  const stats = await getAllStats(includeInactive);
  return reply.send(stats);
}

// POST /admin/playable/stats
export async function createStatHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, displayName, description, sortOrder } = request.body as {
    name: string;
    displayName: string;
    description?: string;
    sortOrder?: number;
  };

  if (!name || !displayName) {
    return reply.status(400).send({ error: 'Stat name and displayName are required.' });
  }

  const stat = await createStat(name, displayName, description, sortOrder);
  return reply.status(201).send(stat);
}

// PATCH /admin/playable/stats/:id
export async function updateStatHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, displayName, description, sortOrder } = request.body as {
    name?: string;
    displayName?: string;
    description?: string;
    sortOrder?: number;
  };

  const updated = await updateStat(id, { name, displayName, description, sortOrder });

  if (!updated) {
    return reply.status(404).send({ error: 'Stat not found.' });
  }

  return reply.send(updated);
}

// PATCH /admin/playable/stats/:id/active
export async function patchStatActiveHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { isActive } = request.body as { isActive?: boolean };

  if (typeof isActive !== 'boolean') {
    return reply.status(400).send({ error: 'Missing or invalid isActive flag.' });
  }

  const success = await setStatActiveState(id, isActive);
  if (!success) {
    return reply.status(404).send({ error: 'Stat not found or unchanged.' });
  }

  return reply.send({ success: true });
}

// DELETE /admin/playable/stats/:id
export async function deleteStatHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  try {
    const success = await deleteStat(id);
    if (!success) {
      return reply.status(404).send({ error: 'Stat not found.' });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof Error && err.message.includes('in use')) {
      return reply.status(409).send({ error: 'Stat is in use and cannot be deleted.' });
    }

    request.log.error(err);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}
