import type { Dimension, ShapeType } from '$lib/types';

export const CONTEXT_KEY = Symbol();

export const dimensions: Record<ShapeType, Dimension> = {
  NOTE: { width: 140, height: 140 },
  AREA: { width: 360, height: 240 },
  TEXT: { width: 200, height: 43 },
};
