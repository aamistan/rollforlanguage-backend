import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';

const app = Fastify({
  logger: true,
});

// Register routes
app.register(authRoutes, { prefix: '/auth' });

export default app;
