import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';
import jwtPlugin from './plugins/jwt.plugin';
import swaggerPlugin from './plugins/swagger.plugin';

const app = Fastify({
  logger: true,
});

// Register plugins BEFORE routes
app.register(jwtPlugin);
app.register(authRoutes, { prefix: '/auth' });
app.register(swaggerPlugin);

app.addHook('onRequest', (request, reply, done) => {
  app.log.info(`Incoming request: ${request.method} ${request.url}`);
  done();
});


export default app;
