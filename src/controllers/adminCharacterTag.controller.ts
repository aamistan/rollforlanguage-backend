// src/controllers/adminCharacterTag.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
  getTagById,
} from '../services/characterTag.service';

export async function getAllTagsHandler(request: FastifyRequest, reply: FastifyReply) {
  const tags = await getAllTags();
  return reply.send(tags);
}

export async function createTagHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, description } = request.body as { name: string; description?: string };

  if (!name || typeof name !== 'string') {
    return reply.status(400).send({ error: 'Tag name is required.' });
  }

  const tag = await createTag(name, description);
  return reply.status(201).send(tag);
}

export async function updateTagHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, description } = request.body as { name?: string; description?: string };

  const updated = await updateTag(id, { name, description });

  if (!updated) {
    return reply.status(404).send({ error: 'Tag not found.' });
  }

  return reply.send(updated);
}

export async function deleteTagHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const success = await deleteTag(id);
  if (!success) {
    return reply.status(404).send({ error: 'Tag not found.' });
  }

  return reply.status(204).send();
}
