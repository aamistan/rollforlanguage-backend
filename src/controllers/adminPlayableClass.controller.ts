// src/controllers/adminPlayableClass.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createPlayableClassSchema,
  updatePlayableClassSchema,
  getPlayableClassesQuerySchema,
  CreatePlayableClassInput,
  UpdatePlayableClassInput,
  GetPlayableClassesQuery,
} from '../schemas/playable_classes';

import {
  getAllPlayableClasses,
  getPlayableClassById,
  createPlayableClass,
  updatePlayableClass,
  deletePlayableClass,
} from '../services/playableClass.service';

/**
 * Admin Playable Class Controller
 * 
 * Purpose:
 * - Validates and routes input for playable class admin operations
 * - Delegates logic to service layer
 * - Powers the admin dashboard endpoints for RPG class management
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

// 🧾 GET /admin/playable/classes
export async function getAllPlayableClassesHandler(
  request: FastifyRequest<{ Querystring: GetPlayableClassesQuery }>,
  reply: FastifyReply
) {
  const query = getPlayableClassesQuerySchema.parse(request.query);
  const result = await getAllPlayableClasses(query);
  return reply.send(result);
}

// 🔍 GET /admin/playable/classes/:id
export async function getPlayableClassByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const playableClass = await getPlayableClassById(id);
  if (!playableClass) {
    return reply.status(404).send({ error: 'Playable class not found.' });
  }
  return reply.send(playableClass);
}

// ➕ POST /admin/playable/classes
export async function createPlayableClassHandler(
  request: FastifyRequest<{ Body: CreatePlayableClassInput }>,
  reply: FastifyReply
) {
  const body = createPlayableClassSchema.parse(request.body);
  const newClass = await createPlayableClass(body);
  return reply.status(201).send(newClass);
}

// ✏️ PATCH /admin/playable/classes/:id
export async function updatePlayableClassHandler(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdatePlayableClassInput }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const updates = updatePlayableClassSchema.parse(request.body);
  const updated = await updatePlayableClass(id, updates);
  if (!updated) {
    return reply.status(404).send({ error: 'Playable class not found.' });
  }
  return reply.send(updated);
}

// ❌ DELETE /admin/playable/classes/:id
export async function deletePlayableClassHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const success = await deletePlayableClass(id);
  if (!success) {
    return reply.status(404).send({ error: 'Playable class not found.' });
  }
  return reply.status(204).send();
}
