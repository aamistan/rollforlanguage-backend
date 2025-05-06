import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';
import jwtPlugin from './plugins/jwt.plugin';
import rateLimitPlugin from './plugins/rateLimit.plugin';
import permissionsPlugin from './plugins/permissions.plugin';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { corsOptions } from './config/cors';

const app = Fastify({
  logger: true,
});

// Register security headers early
app.register(helmet, {
  global: true,
  contentSecurityPolicy: false, // Disable initially to avoid breaking Swagger UI
});

// Register CORS very early using modular config
app.register(cors, corsOptions);

// Register backend plugins (order matters!)
app.register(rateLimitPlugin);
app.register(jwtPlugin);
app.register(permissionsPlugin); // After JWT so request.user is available

// Optional: log incoming requests (skip OPTIONS to avoid noise)
app.addHook('onRequest', (request, reply, done) => {
  if (request.method !== 'OPTIONS') {
    app.log.info(`Incoming request: ${request.method} ${request.url}`);
  }
  done();
});

// Register routes
app.register(authRoutes, { prefix: '/auth' });

// Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(`Global error handler caught: ${error.message}`);
  reply.status(500).send({ error: 'Internal Server Error', message: error.message });
});

export default app;
