import { get, type Writable, writable } from 'svelte/store';
import type { ShapeConfig } from '$lib/types';

type Canvas = Map<string, ShapeConfig>;

export class UndoRedoStore {
  history: Writable<Canvas[]> = writable([]);

  #canvasState: Canvas[] = [];
  #removedActions: Canvas[] = [];

  pushToHistory(data: Canvas): void {
    this.#canvasState.push(data);
    this.history.set(this.#canvasState);
  }

  clearHistory(): void {
    this.#canvasState = [];
    this.#removedActions = [];
    this.history.set([]);
  }

  undo(): Canvas {
    if (this.#canvasState.length > 0) {
      this.#removedActions.push(this.#canvasState.pop()!);
    }

    this.history.set(this.#canvasState);
    if (!this.#canvasState.length) return new Map();

    const lastIndex = this.#canvasState.length - 1;
    return get(this.history)[lastIndex];
  }

  redo(): Canvas {
    if (this.#removedActions.length > 0) {
      this.#canvasState.push(this.#removedActions.pop()!);
    }

    this.history.set(this.#canvasState);
    if (!this.#canvasState.length) return new Map();

    const lastIndex = this.#canvasState.length - 1;
    return get(this.history)[lastIndex];
  }
}
