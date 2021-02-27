import { type, Point } from '@tbs/xplat/core';
import { DrawingMode } from '../drawing-modes';
import { Drawable } from './drawable';

export class Rectangle extends Drawable {
  points: [Point, Point] = [null, null];
  snapsAtAngles = [30, 45];
  snaps = true;
  pointSnapMagnitude = 5;
  name: DrawingMode = 'rectangle';
  type: type = 'rectangle';

  draw = () => {
    this.drawRect(...this.points);
  };

  drawPreview = (next: Point) => {
    if (!this.points.length) {
      return;
    }
    next = this.snapPointToGrid(next);
    this.drawRect(this.points[0], next, true);
  };

  click = (next: Point) => {
    next = this.snapPointToGrid(next);
    if (!this.points[0]) {
      this.points[0] = next;
    } else {
      this.points[1] = next;
      console.log(
        `Created rect at (${this.points[0].x}, ${this.points[0].y}) -> (${this.points[1].x}, ${this.points[1].y})`
      );
      this.$finished.next(this);
    }
  };

  undo = () => {
    this.points.pop();
  };

  private drawRect(pt1: Point, pt2: Point, drawHandles = false): void {
    if (drawHandles) {
      this.drawHandle(pt1);
      this.drawHandle(pt2);
    }
    this.ctx.beginPath();
    this.ctx.rect(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);
    this.ctx.stroke();
  }

  private drawHandle(pt: Point): void {
    this.ctx.beginPath();
    this.ctx.arc(pt.x, pt.y, this.pointSnapMagnitude, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
