// src/routes/mediaUpload.route.ts

import { FastifyInstance } from 'fastify';
import multipart from '@fastify/multipart';
import { uploadToB2 } from '../utils/b2Client';

/**
 * Media Upload Routes
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Handles secure image uploads for character classes and species
 * - Validates file types and size
 * - Uses Backblaze B2 for cloud storage
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

export async function mediaUploadRoutes(app: FastifyInstance) {
  await app.register(multipart);

  app.register(async function (mediaRoutes) {
    mediaRoutes.addHook('onRequest', async (request, reply) => {
      await request.jwtVerify();

      if (!request.hasPermission('manage_characters')) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    mediaRoutes.post('/media/upload', async (request, reply) => {
      const data = await request.file();

      if (!data) {
        return reply.status(400).send({ error: 'No file uploaded.' });
      }

      const { filename, mimetype } = data;
      const buffer = await data.toBuffer();

      if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
        return reply.status(415).send({ error: 'Unsupported file type.' });
      }

      if (buffer.length > MAX_FILE_SIZE) {
        return reply.status(413).send({ error: 'File too large. Max size is 2MB.' });
      }

      const { url } = await uploadToB2({
        fileBuffer: buffer,
        mimeType: mimetype,
        originalFilename: filename,
        folder: 'character-icons',
      });

      return reply.send({ url });
    });
  }, { prefix: '/admin' });
}
