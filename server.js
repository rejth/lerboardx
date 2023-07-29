import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

import { injectSocketIO } from './src/lib/server/injectSocketIO.js';
import { handler } from './build/handler.js';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const server = createServer(app);

injectSocketIO(server);

app.get('/ping', (_req, res) => {
  return res.send({ message: 'pong 🏓' });
});

// SvelteKit should handle everything else, including serving prerendered pages and static assets, using Express middleware
// https://kit.svelte.dev/docs/adapter-node#custom-server
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);
app.use(cors());

server.listen(port, () => {
  console.log(`[ ready ]: Server is running on port ${port}`);
});
