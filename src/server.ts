import { env } from "../config/env";
import app from './app';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const PORT = env.PORT ? Number(env.PORT) : 3000;

// Use Fastify's native Node server
const server = app.server;

// Attach Socket.IO directly
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Adjust for production
    methods: ['GET', 'POST'],
  },
});

// Example connection handler
io.on('connection', (socket) => {
  app.log.info(`Socket connected: ${socket.id}`);

  socket.on('disconnect', () => {
    app.log.info(`Socket disconnected: ${socket.id}`);
  });
});

// Start Fastify (wraps the server)
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server + Socket.IO running at ${address}`);
});
