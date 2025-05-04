import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';
import jwtPlugin from './plugins/jwt.plugin';

const app = Fastify({
  logger: true,
});

// Register plugins BEFORE routes
app.register(jwtPlugin);
app.register(authRoutes, { prefix: '/auth' });

export default app;
