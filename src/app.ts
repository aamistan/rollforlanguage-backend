// src/app.ts

import Fastify from 'fastify';

import jwtPlugin from './plugins/jwt.plugin';
import rateLimitPlugin from './plugins/rateLimit.plugin';
import permissionsPlugin from './plugins/permissions.plugin';

import { corsOptions } from './config/cors';

import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { authRoutes } from './routes/auth.route';
import { adminRoutes } from './routes/admin.route';
import { playableClassAdminRoutes } from './routes/playableClassAdmin.route';
import { playableTagAdminRoutes } from './routes/playableTagAdmin.route';
import { playableStatAdminRoutes } from './routes/playableStatAdmin.route';
import { playablePassiveAdminRoutes } from './routes/playablePassiveAdmin.route';
import { mediaUploadRoutes } from './routes/mediaUpload.route';
import { playableTagCategoryAdminRoutes } from './routes/playableTagCategoryAdmin.route';
import { playableTagCategoryLinkAdminRoutes } from './routes/playableTagCategoryLinkAdmin.route';


const app = Fastify({
  logger: true,
});

// 🛡 Register security headers first
app.register(helmet, {
  global: true,
  contentSecurityPolicy: false, // Disable initially to avoid breaking Swagger UI
});

// 🌐 CORS
app.register(cors, corsOptions);

// 🔌 Backend plugins (order matters!)
app.register(rateLimitPlugin);
app.register(jwtPlugin);
app.register(permissionsPlugin); // After JWT so request.user is available

// 🪵 Optional: log incoming requests
app.addHook('onRequest', (request, reply, done) => {
  if (request.method !== 'OPTIONS') {
    app.log.info(`Incoming request: ${request.method} ${request.url}`);
  }
  done();
});

// 📦 Register routes
app.register(authRoutes, { prefix: '/auth' });
app.register(adminRoutes, { prefix: '/auth' })
app.register(playableClassAdminRoutes, { prefix: '/admin' });
app.register(playableTagAdminRoutes, { prefix: '/admin' });
app.register(playableStatAdminRoutes, { prefix: '/admin' });
app.register(playablePassiveAdminRoutes, { prefix: '/admin' });
app.register(mediaUploadRoutes);
app.register(playableTagCategoryAdminRoutes, { prefix: '/admin' });
app.register(playableTagCategoryLinkAdminRoutes, { prefix: '/admin' });



// 🧯 Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(`Global error handler caught: ${error.message}`);
  reply.status(500).send({ error: 'Internal Server Error', message: error.message });
});

export default app;
