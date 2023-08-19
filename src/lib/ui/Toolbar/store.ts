import { type Writable, writable } from 'svelte/store';

import type { DrawingTool, ShapeType, Tool } from '$lib/types';
import { isDrawingToolSelected, isShapeToolSelected } from './lib';

class ToolbarStore {
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

export const toolbarStore = new ToolbarStore();
