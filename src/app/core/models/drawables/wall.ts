import { Point } from '../point';
import { Drawable } from './drawable';

export class Wall extends Drawable {

    points: Point[] = [];

    snapsAtAngles = [30, 45];

    snaps = true;

    draw = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        this.drawPoints(ctx);
        ctx.stroke();
    }

    drawPreview = (ctx: CanvasRenderingContext2D, next: Point) => {
        ctx.beginPath();
        this.drawPoints(ctx);
        if (this.snaps && this.points.length) { next = this.getSnappedPoint(next).newPoint; }
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

    private getSnappedPoint(pt: Point): SnappingResult {
        const last = this.points[this.points.length - 1];
        const deltaX = pt.x - last.x;
        const deltaY = last.y - pt.y; // y axis is flipped for easier thinking.
        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        let angle = Math.atan2(deltaY, deltaX) / Math.PI * 180;
        if (angle < 0) { angle += 360; }
        let closestSnappingAngle = 0;
        let snappingDelta = 360;
        const snappingAngles = this.getExpandedSnappingAngles();
        for (const x of snappingAngles) {
            const delta = Math.abs(angle - x);
            if ( delta < snappingDelta ) {
                closestSnappingAngle = x;
                snappingDelta = delta;
            }else {
                break;
            }
        }
        console.log(closestSnappingAngle);
        const theta = closestSnappingAngle * Math.PI / 180;
        const dx = magnitude * Math.cos(theta);
        const dy = magnitude * Math.sin(theta);
        const angledPoint = new Point(last.x + dx, last.y - dy);
        snappingDelta = Number.MAX_SAFE_INTEGER;
        let closestPoint = null;
        for (const point of this.points) {
            const delta = (point.x - angledPoint.x) * (point.x - angledPoint.x) + (point.y - angledPoint.y) * (point.y - angledPoint.y);
            if (delta < snappingDelta) {
                closestPoint = point;
                snappingDelta = delta;
            }
        }
        if (snappingDelta < 25) {
            return {
                newPoint: closestPoint,
                snappedToAngle: false,
                snappedToPoint: true
            };
        } else {
            return {
                newPoint: angledPoint,
                snappedToPoint: false,
                snappedToAngle: true
            };
        }
    }

    private getExpandedSnappingAngles(): number[] {
        return Array.from(new Set(this.snapsAtAngles.reduce((acc, angle) => {
            let multiple = angle;
            while (multiple < 360) {
                acc.push(multiple);
                multiple += angle;
            }
            return acc;
        }, [0]))).sort((a, b) => a - b);
    }

    private drawPoints(ctx: CanvasRenderingContext2D): void {
        ctx.moveTo(...this.points[0].coordinates);
        for (let idx = 1; idx < this.points.length; idx++) {
            const pt = this.points[idx];
            ctx.lineTo(...pt.coordinates);
        }
    }
}

interface SnappingResult {
    snappedToPoint: boolean;
    snappedToAngle: boolean;
    newPoint: Point;
}
