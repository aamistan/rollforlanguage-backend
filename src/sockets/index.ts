// src/sockets/index.ts
import { Server as SocketIOServer, Socket } from 'socket.io';
import { FastifyInstance } from 'fastify';

export function setupSocketIO(io: SocketIOServer, app: FastifyInstance) {
  io.on('connection', (socket: Socket) => {
    app.log.info(`🔌 Socket connected: ${socket.id}`);

    // Basic handshake test
    socket.emit('server-message', { message: 'Welcome to Roll for Language!' });

    // Example listener: client sends 'ping', server responds with 'pong'
    socket.on('ping', () => {
      app.log.info(`🏓 Ping received from ${socket.id}`);
      socket.emit('pong', { message: 'Pong!' });
    });

    // Handle disconnections
    socket.on('disconnect', (reason) => {
      app.log.info(`⚡ Socket disconnected: ${socket.id}, reason: ${reason}`);
    });
  });

  app.log.info('✅ Socket.IO setup complete');
}
