import type { Socket } from 'socket.io-client';
import type { CanvasModel } from '../../ui/Canvas';

export type Context = {
  socket: Socket<any, any>;
  canvasStore: CanvasModel;
};
