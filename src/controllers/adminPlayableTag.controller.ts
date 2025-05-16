import { FastifyRequest, FastifyReply } from 'fastify';
import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
  getTagById,
  setTagActiveState,
} from '../services/playableTag.service';

// 🧾 Query type for GET /tags
type TagQuery = { includeInactive?: string };

// GET /admin/characters/tags
export async function getAllTagsHandler(
  request: FastifyRequest<{ Querystring: TagQuery }>,
  reply: FastifyReply
) {
  const includeInactive = request.query.includeInactive === 'true';
  const tags = await getAllTags(includeInactive);
  return reply.send(tags);
}

// POST /admin/characters/tags
export async function createTagHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, sortOrder } = request.body as {
    name: string;
    description?: string;
    sortOrder?: number;
  };

  if (!name || typeof name !== 'string') {
    return reply.status(400).send({ error: 'Tag name is required.' });
  }

  const tag = await createTag(name, description, sortOrder);
  return reply.status(201).send(tag);
}

// PATCH /admin/characters/tags/:id (update name/desc/sort)
export async function updateTagHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, description, sortOrder } = request.body as {
    name?: string;
    description?: string;
    sortOrder?: number;
  };

  const updated = await updateTag(id, { name, description, sortOrder });

  if (!updated) {
    return reply.status(404).send({ error: 'Tag not found.' });
  }

  return reply.send(updated);
}

// PATCH /admin/characters/tags/:id (soft-delete / restore)
export async function patchTagActiveHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { isActive } = request.body as { isActive?: boolean };

  if (typeof isActive !== 'boolean') {
    return reply.status(400).send({ error: 'Missing or invalid isActive flag.' });
  }

  const success = await setTagActiveState(id, isActive);
  if (!success) {
    return reply.status(404).send({ error: 'Tag not found or unchanged.' });
  }

  return reply.send({ success: true });
}

// DELETE /admin/characters/tags/:id
export async function deleteTagHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

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
