import { DrawingMode } from '../drawing-modes';
import { Point } from '../point';
import { Drawable } from './drawable';

export class Polyline extends Drawable {

    points: Point[] = [];
    snapsAtAngles = [30, 45];
    snaps = true;
    pointSnapMagnitude = 5;
    name: DrawingMode = 'polyline';

    draw = (ctx: CanvasRenderingContext2D) => {
        this.drawPoints(ctx);
    }

    drawPreview = (ctx: CanvasRenderingContext2D, next: Point) => {
        if (!this.points.length) { return; }
        this.drawPoints(ctx, true);
        if (this.snaps) { next = this.getSnappedPoint(next).newPoint; }
        ctx.beginPath();
        ctx.moveTo(...this.points[this.points.length - 1].coordinates);
        ctx.lineTo(...next.coordinates);
        ctx.stroke();
    }

    click = (next: Point) => {
        let sr: SnappingResult;
        if (this.snaps && this.points.length) {
            sr = this.getSnappedPoint(next);
            next = sr.newPoint;
        }
        this.points.push(next);
        if (sr && sr.snappedToPoint) {
            this.$finished.next(this);
        }
    }

    public altClick = (pt: Point) => {
        if (this.points.length) {
            this.$finished.next(this);
        } else {
            this.$finished.next(null);
        }
    }

    undo = () => {
        this.points.pop();
    }

    private getSnappedPoint(pt: Point): SnappingResult {
        const last = this.points[this.points.length - 1];

        let snappingDelta = Number.MAX_SAFE_INTEGER;
        let closestPoint = null;
        for (const point of this.points) {
            const delta = (point.x - pt.x) * (point.x - pt.x) + (point.y - pt.y) * (point.y - pt.y);
            if (delta < snappingDelta) {
                closestPoint = point;
                snappingDelta = delta;
            }
        }

        if (snappingDelta < this.pointSnapMagnitude * this.pointSnapMagnitude) {
            return {
                newPoint: closestPoint,
                snappedToAngle: false,
                snappedToPoint: true
            };
        }

        const deltaX = pt.x - last.x;
        const deltaY = last.y - pt.y; // y axis is flipped for easier thinking.
        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        let angle = Math.atan2(deltaY, deltaX) / Math.PI * 180;
        if (angle < 0) { angle += 360; }
        let closestSnappingAngle = 0;
        snappingDelta = 360;
        const snappingAngles = this.getExpandedSnappingAngles();
        for (const x of snappingAngles) {
            const delta = Math.abs(angle - x);
            if (delta < snappingDelta) {
                closestSnappingAngle = x;
                snappingDelta = delta;
            } else {
                break;
            }
        }
        const theta = closestSnappingAngle * Math.PI / 180;
        const dx = magnitude * Math.cos(theta);
        const dy = magnitude * Math.sin(theta);
        const angledPoint = new Point(last.x + dx, last.y - dy);
        return {
            newPoint: angledPoint,
            snappedToPoint: false,
            snappedToAngle: true
        };
    }

    private getExpandedSnappingAngles(): number[] {
        return Array.from(new Set(this.snapsAtAngles.reduce((acc, angle) => {
            let multiple = angle;
            while (multiple < 360) {
                acc.push(multiple);
                multiple += angle;
            }
            return acc;
        }, [0, 360]))).sort((a, b) => a - b);
    }

    private drawPoints(ctx: CanvasRenderingContext2D, drawHandles = false): void {
        if (drawHandles) { this.drawHandle(ctx, this.points[0]); }
        for (let idx = 1; idx < this.points.length; idx++) {
            const pt = this.points[idx];
            if (drawHandles) { this.drawHandle(ctx, pt); }
            this.drawSegment(ctx, this.points[idx - 1], pt);
        }
    }

    private drawHandle(ctx: CanvasRenderingContext2D, pt: Point): void {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, this.pointSnapMagnitude, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    private drawSegment(ctx: CanvasRenderingContext2D, first: Point, second: Point): void {
        ctx.beginPath();
        ctx.moveTo(...first.coordinates);
        ctx.lineTo(...second.coordinates);
        ctx.stroke();
        ctx.closePath();
    }
}

interface SnappingResult {
    snappedToPoint: boolean;
    snappedToAngle: boolean;
    newPoint: Point;
}
