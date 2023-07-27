import { type Writable, writable } from 'svelte/store';
import { isDrawingToolSelected, isShapeToolSelected } from './lib';

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

class ToolbarModel {
  tool: Writable<Tool> = writable('PAN');
  shapeType: Writable<ShapeType | null> = writable(null);
  drawingTool: Writable<DrawingTool | null> = writable(null);

  #setShapeType(tool: Tool): void {
    if (isShapeToolSelected(tool)) {
      this.shapeType.set(tool as ShapeType);
    } else {
      this.shapeType.set(null);
    }
  }

  #setDrawingTool(tool: Tool): void {
    if (isDrawingToolSelected(tool)) {
      this.drawingTool.set(tool as DrawingTool);
    } else {
      this.drawingTool.set(null);
    }
  }

  changeTool(tool: Tool): void {
    this.tool.set(tool);
    this.#setShapeType(tool);
    this.#setDrawingTool(tool);
  }
}

export const toolbarModel = new ToolbarModel();
