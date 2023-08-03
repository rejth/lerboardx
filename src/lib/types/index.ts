import type { Socket } from 'socket.io-client';
import type { CanvasModel } from '$lib/ui/Canvas';

export type Context = {
  socket: Socket<any, any>;
  canvasStore: CanvasModel;
};
