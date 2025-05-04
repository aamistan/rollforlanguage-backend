import { env } from './config/env';
import app from './app';
import { Server as SocketIOServer } from 'socket.io';

// Determine port number (default 3000)
const PORT = Number(env.PORT) || 3000;

// Use Fastify’s native Node server instance
const server = app.server;

// Attach Socket.IO directly to the Fastify server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // ⚠️ Adjust this for production security!
    methods: ['GET', 'POST'],
  },
});

// Example real-time connection handler
io.on('connection', (socket) => {
  app.log.info(`🔌 Socket connected: ${socket.id}`);

  socket.on('disconnect', () => {
    app.log.info(`❌ Socket disconnected: ${socket.id}`);
  });
});

// Start Fastify with explicit host + port binding
server.listen(PORT, '0.0.0.0', () => {
  app.log.info(`🚀 Server + Socket.IO running at http://0.0.0.0:${PORT}`);
});
