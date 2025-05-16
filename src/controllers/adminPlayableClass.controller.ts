// src/controllers/adminCharacter.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createCharacterClassSchema,
  updateCharacterClassSchema,
  getCharacterClassesQuerySchema,
  CreateCharacterClassInput,
  UpdateCharacterClassInput,
  GetCharacterClassesQuery,
} from '../schemas/adminCharacter.schema';

import {
  getAllCharacterClasses,
  getCharacterClassById,
  createCharacterClass,
  updateCharacterClass,
  deleteCharacterClass,
} from '../services/playableClass.service';

/**
 * Admin Character Controller
 * 
 * Purpose:
 * - Validates and routes input for character class admin operations
 * - Delegates logic to service layer
 * - Powers the admin dashboard endpoints for RPG class management
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

// 🧾 GET /admin/characters/classes
export async function getAllCharacterClassesHandler(
  request: FastifyRequest<{ Querystring: GetCharacterClassesQuery }>,
  reply: FastifyReply
) {
  const query = getCharacterClassesQuerySchema.parse(request.query);
  const result = await getAllCharacterClasses(query);
  return reply.send(result);
}

// 🔍 GET /admin/characters/classes/:id
export async function getCharacterClassByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const playableClass = await getCharacterClassById(id);
  if (!playableClass) {
    return reply.status(404).send({ error: 'Character class not found.' });
  }
  return reply.send(playableClass);
}

// ➕ POST /admin/characters/classes
export async function createCharacterClassHandler(
  request: FastifyRequest<{ Body: CreateCharacterClassInput }>,
  reply: FastifyReply
) {
  const body = createCharacterClassSchema.parse(request.body);
  const newClass = await createCharacterClass(body);
  return reply.status(201).send(newClass);
}

// ✏️ PATCH /admin/characters/classes/:id
export async function updateCharacterClassHandler(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateCharacterClassInput }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const updates = updateCharacterClassSchema.parse(request.body);
  const updated = await updateCharacterClass(id, updates);
  if (!updated) {
    return reply.status(404).send({ error: 'Character class not found.' });
  }
  return reply.send(updated);
}

// ❌ DELETE /admin/characters/classes/:id
export async function deleteCharacterClassHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const success = await deleteCharacterClass(id);
  if (!success) {
    return reply.status(404).send({ error: 'Character class not found.' });
  }
  return reply.status(204).send();
}
