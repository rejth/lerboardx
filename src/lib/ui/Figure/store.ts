import { type Writable, writable, get } from 'svelte/store';

import type { FigureConfig } from '$lib/types';
import { GeometryManager } from '$lib/services';

export class FigureModel {
  figure: Writable<FigureConfig> = writable();
  #geometryManager: GeometryManager;

  constructor(attributes: FigureConfig) {
    this.#geometryManager = new GeometryManager();
    this.figure.set(attributes);
  }

  calculateQuadraticCurveSVGPath(e: MouseEvent, rect: DOMRect): void {
    const figure = get(this.figure);
    const from = figure?.path[0];
    const to = figure?.path[figure.path.length - 1];

    const peakCurvePoint = this.#geometryManager.getMousePosition(e, rect);

    this.figure.update((value) => ({
      ...value,
      svgPath: this.#geometryManager.getQuadraticCurveSVGPath(from, to, peakCurvePoint),
    }));
  }
}
