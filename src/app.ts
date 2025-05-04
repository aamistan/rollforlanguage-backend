import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';
import jwtPlugin from './plugins/jwt.plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const app = Fastify({
  logger: true,
});

// Register Swagger plugins first
app.register(swagger, {
  openapi: {
    info: {
      title: 'Roll for Language API',
      description: 'API documentation for the RPG language learning backend',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
});

// Register custom plugins and routes
app.register(jwtPlugin);
app.register(authRoutes, { prefix: '/auth' });

// Optional: log incoming requests
app.addHook('onRequest', (request, reply, done) => {
  app.log.info(`Incoming request: ${request.method} ${request.url}`);
  done();
});

// Finalize Swagger generation
app.ready().then(() => {
  app.swagger();
});

export default app;
