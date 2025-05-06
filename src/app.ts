import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';
import jwtPlugin from './plugins/jwt.plugin';
import rateLimitPlugin from './plugins/rateLimit.plugin';
import permissionsPlugin from './plugins/permissions.plugin';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const app = Fastify({
  logger: true,
});

// Register security headers early
app.register(helmet, {
  global: true,
  contentSecurityPolicy: false, // Disable initially to avoid breaking Swagger UI
});

// Register CORS with strict allowed origins
app.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      'http://localhost:5173', // Local frontend (Vite dev server)
      'https://www.rollforlanguage.com', // Production frontend (replace with your actual domain)
      'https://bug-free-parakeet-x5p69xpg56qvfvvx5-4000.app.github.dev/', // Allow frontend Codespace
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
});

// Swagger setup
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

// Register backend plugins (order matters!)
app.register(rateLimitPlugin);
app.register(jwtPlugin);
app.register(permissionsPlugin); // After JWT so request.user is available

// Register routes
app.register(authRoutes, { prefix: '/auth' });

// Optional: log incoming requests
app.addHook('onRequest', (request, reply, done) => {
  app.log.info(`Incoming request: ${request.method} ${request.url}`);
  done();
});

// Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(`Global error handler caught: ${error.message}`);
  reply.status(500).send({ error: 'Internal Server Error', message: error.message });
});

// Finalize Swagger setup after all routes are loaded
app.ready().then(() => {
  app.swagger();
});

export default app;
