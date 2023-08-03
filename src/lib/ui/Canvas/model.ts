import { get, type Writable, writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

import type { Context } from '$lib/types';
import { GeometryManager, type Dimension, type Point, type RectPosition } from '$lib/services';

import {
  type ShapeType,
  type Tool,
  toolbarModel,
  Tools,
  isDrawingToolSelected,
} from '$lib/ui/Toolbar';

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

const dimensions: Record<ShapeType, Dimension> = {
  NOTE: { width: 140, height: 140 },
  AREA: { width: 360, height: 240 },
  TEXT: { width: 200, height: 43 },
};

export class CanvasModel {
  shapes: Writable<Map<string, ShapeConfig>> = writable(new Map());
  selectedShapes: Writable<Map<string, ShapeConfig>> = writable(new Map());
  selection: Writable<Point[]> = writable([]);
  mousePosition: Writable<Point> = writable({ x: 0, y: 0 });

  #geometryManager: GeometryManager;
  #socket: Context['socket'];
  shapeType: ShapeType | null = null;
  tool: Tool = Tools.PAN;

  constructor(socket: Context['socket']) {
    this.#geometryManager = new GeometryManager();
    this.#socket = socket;

    this.#socket.on('order:add', (payload: ShapeConfig) => {
      this.shapes.update((shapes) => shapes.set(payload.uuid, payload));
    });
    this.#socket.on('order:delete', (payload: Array<[string, ShapeConfig]>) => {
      this.shapes.set(new Map(payload));
      this.selectedShapes.set(new Map(payload));
    });

    toolbarModel.shapeType.subscribe((value) => {
      this.shapeType = value;
    });
    toolbarModel.tool.subscribe((value) => {
      this.tool = value;
    });
  }

  #createShape(uuid: string, type: ShapeType, { x, y }: Point): ShapeConfig {
    const { width, height } = dimensions[type];
    const styles = `
      width: ${width}em;
      height: ${height}em;
      transform: translate(${x}px, ${y}px);
    `;

    return {
      uuid,
      type,
      width,
      height,
      x,
      y,
      styles,
      rect: this.#geometryManager.getRectPosition({ x, y, width, height }),
      selected: true,
    };
  }

  #removeSelected(
    store: Map<string, ShapeConfig>,
    selected: Map<string, ShapeConfig>,
  ): Map<string, ShapeConfig> {
    return new Map([...store.entries()].filter(([key]) => !selected.has(key)));
  }

  dragCanvas(e: MouseEvent, rect: DOMRect): void {
    if (isDrawingToolSelected(this.tool) || this.tool === Tools.SELECT) return;

    const selected = get(this.selectedShapes);
    const insideCanvas = this.#geometryManager.insideRect(e, rect);
    if (insideCanvas && selected.size === 0) {
      this.mousePosition.update((point) => this.#geometryManager.move(e, point));
    }
  }

  dragSelection(e: MouseEvent, rect: DOMRect): void {
    if (this.tool !== Tools.SELECT) return;
    const insideCanvas = this.#geometryManager.insideRect(e, rect);

    if (insideCanvas) {
      const point = this.#geometryManager.getMousePosition(e, rect);
      this.selection.update((path) => [...path, point]);
    }
  }

  resetSelection(): void {
    this.selection.set([]);
  }

  addShape(e: MouseEvent, rect: DOMRect): void {
    if (!this.shapeType) return;
    const position = this.#geometryManager.getMousePosition(e, rect);
    const shape = this.#createShape(uuid(), this.shapeType, position);
    this.selectShape(shape);

    this.shapes.update((shapes) => shapes.set(shape.uuid, shape));
    toolbarModel.tool.set(Tools.PAN);
    toolbarModel.shapeType.set(null);

    this.#socket.emit('order:add', shape);
  }

  selectShape(shape: ShapeConfig): void {
    this.selectedShapes.update((selected) => selected.set(shape.uuid, shape));
  }

  deselectShape(shape: ShapeConfig): void {
    this.selectedShapes.update((selected) => {
      selected.delete(shape.uuid);
      return selected;
    });
  }

  deleteShape(): void {
    const selected = get(this.selectedShapes);
    this.selectedShapes.update((shapes) => this.#removeSelected(shapes, selected));
    this.shapes.update((shapes) => this.#removeSelected(shapes, selected));

    this.#socket.emit('order:delete', Array.from(get(this.shapes)));
  }

  clearAllSelected(): void {
    this.selectedShapes.update((selected) => {
      selected.clear();
      return selected;
    });
  }
}
