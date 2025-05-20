// src/controllers/adminPlayableTag.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createPlayableTagSchema,
  updatePlayableTagSchema,
  getPlayableTagsQuerySchema,
  CreatePlayableTagInput,
  UpdatePlayableTagInput,
  GetPlayableTagsQuery,
} from '../schemas/playable_tags';

import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
  getTagById,
  setTagActiveState,
} from '../services/playableTag.service';

/**
 * Admin Playable Tag Controller
 * 
 * Purpose:
 * - Validates and routes input for tag creation, editing, deletion
 * - Supports color-coded classification
 * - Powers admin dashboard tag modals and widgets
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

// 🔍 GET /admin/playable/tags
export async function getAllTagsHandler(
  request: FastifyRequest<{ Querystring: GetPlayableTagsQuery }>,
  reply: FastifyReply
) {
  const query = getPlayableTagsQuerySchema.parse(request.query);
  const tags = await getAllTags(query.includeInactive === true);
  return reply.send(tags);
}

// ➕ POST /admin/playable/tags
export async function createTagHandler(
  request: FastifyRequest<{ Body: CreatePlayableTagInput }>,
  reply: FastifyReply
) {
  const input = createPlayableTagSchema.parse(request.body);
  const tag = await createTag(input);
  return reply.status(201).send(tag);
}

// ✏️ PATCH /admin/playable/tags/:id
export async function updateTagHandler(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdatePlayableTagInput }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const updates = updatePlayableTagSchema.parse(request.body);
  const updated = await updateTag(id, updates);

  if (!updated) {
    return reply.status(404).send({ error: 'Tag not found.' });
  }

  return reply.send(updated);
}

// 🔁 PATCH /admin/playable/tags/:id/active
export async function patchTagActiveHandler(
  request: FastifyRequest<{ Params: { id: string }; Body: { isActive?: boolean } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const { isActive } = request.body;

  if (typeof isActive !== 'boolean') {
    return reply.status(400).send({ error: 'Missing or invalid isActive flag.' });
  }

  const success = await setTagActiveState(id, isActive);
  if (!success) {
    return reply.status(404).send({ error: 'Tag not found or unchanged.' });
  }

  return reply.send({ success: true });
}

// ❌ DELETE /admin/playable/tags/:id
export async function deleteTagHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  try {
    const success = await deleteTag(id);
    if (!success) {
      return reply.status(404).send({ error: 'Tag not found.' });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof Error && err.message.includes('in use')) {
      return reply.status(409).send({ error: 'Tag is in use and cannot be deleted.' });
    }

    request.log.error(err);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}
