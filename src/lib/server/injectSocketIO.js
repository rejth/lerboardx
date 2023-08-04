// @ts-nocheck
import { Server } from 'socket.io';

export function injectSocketIO(server) {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  const rooms = new Map();

  io.on('connection', (socket) => {
    console.log(`Hello, World 👋! Socket ${socket.id} connected!`);

    const getRoomId = () => {
      const joinedRoom = [...socket.rooms].find((room) => room !== socket.id);
      if (!joinedRoom) return socket.id;
      return joinedRoom;
    };

    const leaveRoom = (roomId, socketId) => {
      const room = rooms.get(roomId);
      if (!room) return;

      room.users.delete(socketId);
      socket.leave(roomId);
    };

    // Join a room
    socket.on('order:join-room', (roomId, username = 'Anonymous') => {
      const room = rooms.get(roomId);

      if (!room) {
        rooms.set(roomId, { board: new Map(), users: new Map([[socket.id, username]]) });
        socket.emit('board', []);
      } else {
        room.users.set(socket.id, username);
        socket.emit('board', Array.from(room.board));
      }

      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-joined', socket.id);
    });

    // Leave a room
    socket.on('order:leave-room', () => {
      const roomId = getRoomId();

      leaveRoom(roomId, socket.id);
      io.to(roomId).emit('user-disconnected', socket.id);
    });

    // Create a new shape/figure
    socket.on('order:add', (shape) => {
      const roomId = getRoomId();
      const room = rooms.get(roomId);

      room.board.set(shape.uuid, shape);
      socket.broadcast.to(roomId).emit('order:add', shape);
    });

    // Delete a shape/figure
    socket.on('order:delete', (shapesLeft) => {
      const roomId = getRoomId();
      const room = rooms.get(roomId);

      rooms.set(roomId, { ...room, board: new Map(shapesLeft) });
      socket.broadcast.to(roomId).emit('order:delete', shapesLeft);
    });

    // Change a shape/figure position, size, color, text, etc.
    socket.on('order:change', (shape) => {
      const roomId = getRoomId();
      const room = rooms.get(roomId);

      room.board.set(shape.uuid, shape);
      socket.broadcast.to(roomId).emit('order:change', shape);
    });

    // Undo action
    socket.on('order:undo', () => {
      const roomId = getRoomId();
      socket.broadcast.to(roomId).emit('user-undo', socket.id);
    });

    // Redo action
    socket.on('order:redo', () => {
      const roomId = getRoomId();
      socket.broadcast.to(roomId).emit('user-redo', socket.id);
    });

    socket.on('disconnecting', () => {
      const roomId = getRoomId();

      leaveRoom(roomId, socket.id);
      io.to(roomId).emit('user-disconnected', socket.id);
    });
  });
}
