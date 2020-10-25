import { DrawingMode } from '../drawing-modes';
import { Point } from '../point';
import { Drawable } from './drawable';

export class Rectangle extends Drawable {

    points: [Point, Point] = [null, null];
    snapsAtAngles = [30, 45];
    snaps = true;
    pointSnapMagnitude = 5;
    name: DrawingMode = 'polyline';

    draw = (ctx: CanvasRenderingContext2D) => {
        this.drawRect(ctx, ...this.points);
    }

    drawPreview = (ctx: CanvasRenderingContext2D, next: Point) => {
        if (!this.points.length) { return; }
        this.drawRect(ctx, this.points[0], next, true);
    }

    click = (next: Point) => {
        if (!this.points[0]) {
            this.points[0] = next;
        } else {
            this.points[1] = next;
            console.log(`Created rect at (${this.points[0].x}, ${this.points[0].y}) -> (${this.points[1].x}, ${this.points[1].y})`)
            this.$finished.next(this);
        }
    }

    undo = () => {
        this.points.pop();
    }

    private drawRect(ctx: CanvasRenderingContext2D, pt1: Point, pt2: Point, drawHandles = false): void {
        if (drawHandles) {
            this.drawHandle(ctx, pt1);
            this.drawHandle(ctx, pt2);
        }
        ctx.beginPath();
        ctx.rect(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);
        ctx.stroke();
    }

    private drawHandle(ctx: CanvasRenderingContext2D, pt: Point): void {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, this.pointSnapMagnitude, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}
