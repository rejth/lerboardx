import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../../../build/handler.js';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected! Hello, World 👋`);

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

app.get('/ping', (_req, res) => {
  return res.send({ message: 'pong 🏓' });
});

// SvelteKit should handle everything else, including serving prerendered pages and static assets, using Express middleware
// https://kit.svelte.dev/docs/adapter-node#custom-server
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
