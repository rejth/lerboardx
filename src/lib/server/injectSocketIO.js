// @ts-nocheck
import { Server } from 'socket.io';

export function injectSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Hello, World 👋! Socket ${socket.id} connected!`);

    socket.on('order:add', (payload) => {
      socket.broadcast.emit('order:add', payload);
    });

    socket.on('order:delete', (payload) => {
      socket.broadcast.emit('order:delete', payload);
    });

    socket.on('order:change', (payload) => {
      socket.broadcast.emit('order:change', payload);
    });
  });
}
