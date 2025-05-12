// src/utils/b2Client.ts

import B2 from 'backblaze-b2';
import { env } from '../config/env';
import slugify from 'slugify';
import crypto from 'crypto';
import path from 'path';

const b2 = new B2({
  applicationKeyId: env.B2_APPLICATION_KEY_ID,
  applicationKey: env.B2_APPLICATION_KEY,
});

let authorized = false;

/**
 * Ensures we have a valid upload authorization token
 */
async function ensureAuth() {
  if (!authorized) {
    await b2.authorize(); // Authorizes the B2 client session
    authorized = true;
  }
}

/**
 * Uploads a file buffer to Backblaze B2
 */
export async function uploadToB2({
  fileBuffer,
  mimeType,
  originalFilename,
  folder = 'character-icons',
}: {
  fileBuffer: Buffer;
  mimeType: string;
  originalFilename: string;
  folder?: string;
}): Promise<{ url: string }> {
  await ensureAuth();

  const extension = path.extname(originalFilename);
  const base = slugify(originalFilename.replace(extension, ''), { lower: true });
  const hash = crypto.randomBytes(8).toString('hex');
  const fileName = `${folder}/${base}-${hash}${extension}`;

  const { data: uploadUrlData } = await b2.getUploadUrl({
    bucketId: env.B2_BUCKET_NAME,
  });

  await b2.uploadFile({
    uploadUrl: uploadUrlData.uploadUrl,
    uploadAuthToken: uploadUrlData.authorizationToken,
    fileName,
    data: fileBuffer,
    mime: mimeType,
  });

  return {
    url: `${env.B2_PUBLIC_URL}/${fileName}`,
  };
}
