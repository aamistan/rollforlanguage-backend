// src/controllers/adminCharacterStat.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  getAllStats,
  createStat,
  updateStat,
  deleteStat,
  getStatById,
} from '../services/characterStat.service';

export async function getAllStatsHandler(request: FastifyRequest, reply: FastifyReply) {
  const stats = await getAllStats();
  return reply.send(stats);
}

export async function createStatHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, displayName, description } = request.body as {
    name: string;
    displayName: string;
    description?: string;
  };

  if (!name || !displayName) {
    return reply.status(400).send({ error: 'Stat name and displayName are required.' });
  }

  const stat = await createStat(name, displayName, description);
  return reply.status(201).send(stat);
}

export async function updateStatHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, displayName, description } = request.body as {
    name?: string;
    displayName?: string;
    description?: string;
  };

  const updated = await updateStat(id, { name, displayName, description });

  if (!updated) {
    return reply.status(404).send({ error: 'Stat not found.' });
  }

  return reply.send(updated);
}

export async function deleteStatHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const success = await deleteStat(id);
  if (!success) {
    return reply.status(404).send({ error: 'Stat not found.' });
  }

  return reply.status(204).send();
}
