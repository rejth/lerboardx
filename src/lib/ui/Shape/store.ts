import { type Writable, writable, get } from 'svelte/store';

import type { Context, Point, ShapeConfig } from '$lib/types';
import { GeometryManager } from '$lib/services';

export class ShapeStore {
  shape: Writable<ShapeConfig> = writable();

  #geometryManager: GeometryManager;
  #canvasStore: Context['canvasStore'];
  #socket: Context['socket'];
  #undoRedoPerformed = false;
  allSelected: Map<string, ShapeConfig> = new Map();

  constructor(
    config: ShapeConfig,
    socket: Context['socket'],
    canvasStore: Context['canvasStore'],
    undoRedoStore: Context['undoRedoStore'],
  ) {
    this.#geometryManager = new GeometryManager();
    this.#canvasStore = canvasStore;
    this.#socket = socket;
    this.shape.set(config);

    this.#socket.on('order:change', (payload: ShapeConfig) => {
      if (get(this.shape).uuid !== payload.uuid) return;
      this.shape.set(payload);
    });

    undoRedoStore.performed.subscribe((value) => {
      this.#undoRedoPerformed = value;
    });
    canvasStore.shapes.subscribe((value) => {
      if (!this.#undoRedoPerformed) return;
      this.shape.set(value.get(config.uuid)!);
      undoRedoStore.setPerformed(false);
    });
    canvasStore.selectedShapes.subscribe((value) => {
      this.allSelected = value;
    });
  }

  overlap(path: Point[]): void {
    if (path.length === 0) return;
    const shape = get(this.shape);

    const dimension = this.#geometryManager.getRectDimension(path);
    const position = this.#geometryManager.getRectPosition(dimension);
    const overlapped = this.#geometryManager.overlapRect(position, shape?.rect);

    if (overlapped) {
      if (!this.allSelected.has(shape.uuid)) {
        this.#canvasStore.selectShape(shape);
      }
    } else {
      this.#canvasStore.deselectShape(shape);
    }

    this.select(overlapped);
  }

  move(e: MouseEvent, rect: DOMRect): ShapeConfig {
    this.shape.update((shape) => {
      const { x, y } = shape;
      const position = this.#geometryManager.move(e, { x, y });
      return { ...shape, ...position, rect };
    });
    return get(this.shape);
  }

  resize(e: MouseEvent, rect: DOMRect): ShapeConfig {
    const dimension = this.#geometryManager.resize(e, rect);
    this.shape.update((shape) => ({ ...shape, ...dimension, rect }));
    return get(this.shape);
  }

  select(selected: boolean): void {
    this.shape.update((shape) => ({ ...shape, selected }));
    this.#socket.emit('order:change', get(this.shape));
  }
}
