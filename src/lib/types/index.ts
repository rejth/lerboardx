import type { Socket } from 'socket.io-client';
import type { CanvasModel } from '$lib/ui/Canvas';
import type { UndoRedoStore } from '$lib/services';

export type Context = {
  socket: Socket<any, any>;
  canvasStore: CanvasModel;
  undoRedoStore: UndoRedoStore;
};

export type RoomLoadData = {
  roomId: string;
};

export type Point = Pick<DOMRect, 'x' | 'y'>;
export type Dimension = Pick<DOMRect, 'width' | 'height'>;
export type RectPosition = Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>;
export type RectDimension = Point & Dimension;

export type Tool = keyof typeof Tools;
export type ShapeType = 'NOTE' | 'TEXT' | 'AREA';
export type DrawingTool = 'RECT' | 'CONNECT' | 'PEN';
export type ServiceTool = 'PAN' | 'DELETE';
export enum Tools {
  NOTE = 'NOTE',
  TEXT = 'TEXT',
  AREA = 'AREA',
  PEN = 'PEN',
  SELECT = 'SELECT',
  CONNECT = 'CONNECT',
  RECT = 'RECT',
  PAN = 'PAN',
  DELETE = 'DELETE',
}

export type ShapeConfig = {
  uuid: string;
  type: ShapeType;
  rect: RectPosition;
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
  styles: string;
  color?: string;
  text?: string;
};

export type FigureConfig = {
  uuid: string;
  type: DrawingTool | null;
  path: Point[];
  svgPath?: string;
};
