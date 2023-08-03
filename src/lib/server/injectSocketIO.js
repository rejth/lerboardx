// @ts-nocheck
import { Server } from 'socket.io';

export function injectSocketIO(server) {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  const rooms = new Map();

  io.on('connection', (socket) => {
    console.log(`Hello, World 👋! Socket ${socket.id} connected!`);

    socket.on('order:join-room', (roomId, username) => {
      const room = rooms.get(roomId);
      if (!room) {
        rooms.set(roomId, { board: null, users: new Map([[socket.id, username]]) });
      } else {
        room.users.set(socket.id, username);
      }

      socket.join(roomId);
      io.to(roomId).emit('user-joined', socket.id);
    });

    socket.on('order:delete-room', (roomId) => {
      rooms.delete(roomId);
      io.sockets.in(roomId).leave(roomId);
    });

    socket.on('order:leave-room', (roomId) => {
      const room = rooms.get(roomId);
      if (!room) return;

      room.users.delete(socket.id);

      socket.leave(roomId);
      io.to(roomId).emit('user-disconnected', socket.id);
    });

    socket.on('order:add', (payload) => {
      socket.broadcast.emit('order:add', payload);
    });

    socket.on('order:delete', (payload) => {
      socket.broadcast.emit('order:delete', payload);
    });

    socket.on('order:change', (payload) => {
      socket.broadcast.emit('order:change', payload);
    });

    socket.on('disconnecting', () => {
      // Rooms are left automatically upon disconnection.
      // We just need to notify other members about leaving the room
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          io.to(room).emit('user-disconnected', socket.id);
        }
      }
    });
  });
}
