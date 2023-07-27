import type { Tool } from './model';

export function isShapeToolSelected(tool: Tool): boolean {
  return ['NOTE', 'TEXT', 'AREA'].includes(tool);
}

export function isDrawingToolSelected(tool: Tool): boolean {
  return ['RECT', 'CONNECT', 'PEN'].includes(tool);
}

export function isServiceToolSelected(tool: Tool): boolean {
  return ['PAN', 'DELETE'].includes(tool);
}
