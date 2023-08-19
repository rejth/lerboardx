import { get, type Writable, writable } from 'svelte/store';
import type { ShapeConfig } from '$lib/types';

type Canvas = Map<string, ShapeConfig>;

export class UndoRedoStore {
  history: Writable<Canvas[]> = writable([]);
  undone: Writable<Canvas[]> = writable([]);
  performed: Writable<boolean> = writable(false);

  #canvasState: Canvas[] = [];

  pushToHistory(data: Canvas): void {
    this.#canvasState.push(data);
    this.history.set(this.#canvasState);
  }

  clearHistory(): void {
    this.#canvasState = [];
    this.undone.set([]);
    this.history.set([]);
  }

  setPerformed(performed: boolean): void {
    this.performed.set(performed);
  }

  undo(): Canvas {
    const undone = get(this.undone);

    if (this.#canvasState.length > 0) {
      const last = this.#canvasState.pop();
      undone.push(last!);
      this.undone.set(undone);
    }

    this.history.set(this.#canvasState);
    if (!this.#canvasState.length) return new Map();

    const lastIndex = this.#canvasState.length - 1;

    this.setPerformed(true);
    return get(this.history)[lastIndex];
  }

  redo(): Canvas {
    const undone = get(this.undone);

    if (undone.length > 0) {
      const last = undone.pop();
      this.#canvasState.push(last!);
    }

    this.history.set(this.#canvasState);
    this.undone.set(undone);
    if (!this.#canvasState.length) return new Map();

    const lastIndex = this.#canvasState.length - 1;

    this.setPerformed(true);
    return get(this.history)[lastIndex];
  }
}
