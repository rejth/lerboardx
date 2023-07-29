import type { ViteDevServer } from 'vite';
import { injectSocketIO } from './injectSocketIO';

export const webSocketServerPlugin = {
  name: 'webSocketServerPlugin',
  configureServer(server: ViteDevServer) {
    injectSocketIO(server.httpServer);
  },
};
