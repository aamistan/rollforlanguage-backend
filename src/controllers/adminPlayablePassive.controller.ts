// src/controllers/adminCharacterPassive.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  getAllPassives,
  createPassive,
  updatePassive,
  deletePassive,
  getPassiveById,
} from '../services/playablePassive.service';

export async function getAllPassivesHandler(request: FastifyRequest, reply: FastifyReply) {
  const passives = await getAllPassives();
  return reply.send(passives);
}

export async function createPassiveHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, description } = request.body as {
    name: string;
    description?: string;
  };

  if (!name) {
    return reply.status(400).send({ error: 'Passive name is required.' });
  }

  const passive = await createPassive(name, description);
  return reply.status(201).send(passive);
}

export async function updatePassiveHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, description } = request.body as {
    name?: string;
    description?: string;
  };

  const updated = await updatePassive(id, { name, description });

  if (!updated) {
    return reply.status(404).send({ error: 'Passive not found.' });
  }

  return reply.send(updated);
}

export async function deletePassiveHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const success = await deletePassive(id);
  if (!success) {
    return reply.status(404).send({ error: 'Passive not found.' });
  }

  return reply.status(204).send();
}
