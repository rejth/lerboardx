import { Bezier } from 'bezier-js';

import {
  Tools,
  type Dimension,
  type Point,
  type RectDimension,
  type RectPosition,
  type FigureConfig,
} from '$lib/types';

export class GeometryManager {
  #ROUND = 2;

  getMousePosition(e: MouseEvent, rect: DOMRect): Point {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  move(e: MouseEvent, p: Point): Point {
    return {
      x: p.x + e.movementX,
      y: p.y + e.movementY,
    };
  }

  resize(e: MouseEvent, rect: DOMRect): Dimension {
    const width = this.#ROUND * Math.round(e.clientX / this.#ROUND) - rect.left;
    const height = this.#ROUND * Math.round(e.clientY / this.#ROUND) - rect.top;
    return { width, height };
  }

  getRectDimension(path: Point[]): RectDimension {
    const from = path[0] ?? 0;
    const to = path[path.length - 1] ?? 0;
    return {
      x: Math.min(from.x, to.x),
      y: Math.min(from.y, to.y),
      width: Math.abs(from.x - to.x),
      height: Math.abs(from.y - to.y),
    };
  }

  getFigureRect(figure: FigureConfig): RectDimension {
    const from = figure.path[0] ?? 0;
    const to = figure.path[figure.path.length - 1] ?? 0;

    if (figure.type === Tools.PEN) {
      const px = figure.path.map((p) => p.x);
      const py = figure.path.map((p) => p.y);
      const minX = Math.min(...px);
      const maxX = Math.max(...px);
      const minY = Math.min(...py);
      const maxY = Math.max(...py);
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }

    return {
      x: Math.min(from.x, to.x),
      y: Math.min(from.y, to.y),
      width: Math.abs(from.x - to.x),
      height: Math.abs(from.y - to.y),
    };
  }

  getRectPosition(rect: RectDimension): RectPosition {
    return {
      left: rect.x,
      top: rect.y,
      bottom: rect.y + rect.height,
      right: rect.x + rect.width,
    };
  }

  overlapRect(rectA: RectPosition, rectB: RectPosition): boolean {
    return (
      rectA.left < rectB.right &&
      rectA.right > rectB.left &&
      rectA.top < rectB.bottom &&
      rectA.bottom > rectB.top
    );
  }

  insideRect(p: Point, rect: DOMRect): boolean {
    return p.x > rect.left && p.x < rect.right && p.y > rect.top && p.y < rect.bottom;
  }

  pointInsideDimensionRect(p: Point, rect: DOMRect): boolean {
    return (
      p.x >= rect.x && p.x <= rect.x + rect.width && p.y >= rect.y && p.y <= rect.y + rect.height
    );
  }

  calculateLineDegreesAngle(p1: Point, p2: Point): number {
    return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
  }

  calculateCurveDegreesAngle(curve: any): number {
    const d = curve.derivative(1); // tangent vector at the very end of the curve
    const angle = ((Math.atan2(d.y, d.x) - Math.atan2(0, Math.abs(d.x))) * 180) / Math.PI;
    return Math.round(angle);
  }

  getLineMiddlePoint(from: Point, to: Point): Point {
    return { x: (to.x + from.x) * 0.5, y: (to.y + from.y) * 0.5 };
  }

  getBezierCurveFromPoints(from: Point, middle: Point, to: Point): any {
    return Bezier.quadraticFromPoints(from, middle, to);
  }

  getQuadraticCurveSVGPath(from: Point, to: Point, peakCurvePoint: Point): string {
    if (!peakCurvePoint) {
      const midPoint = this.getLineMiddlePoint(from, to);
      return `M ${from.x} ${from.y} Q ${midPoint.x} ${midPoint.y} ${to.x} ${to.y}`;
    }

    const curve = this.getBezierCurveFromPoints(from, peakCurvePoint, to).getLUT();

    const path = [`M ${curve[0].x} ${curve[0].y}`];
    const collector = curve.slice(1, curve.length).map((p: Point) => `L ${p.x} ${p.y}`);
    return path.concat(collector).join(' ');
  }
}
