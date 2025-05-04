import app from './app';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Create raw HTTP server using Fastify's .server
const server = createServer(app.server);

// Attach Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Adjust in production!
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

// Start server
server.listen(PORT, () => {
  app.log.info(`Server + Socket.IO running at http://localhost:${PORT}`);
});
