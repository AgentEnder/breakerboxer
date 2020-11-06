import { type } from '../base-model';
import { DrawingMode } from '../drawing-modes';
import { Point } from '../point';
import { Drawable } from './drawable';

export class Polyline extends Drawable {

    points: Point[] = [];
    pointSnapMagnitude = 5;
    name: DrawingMode = 'polyline';
    type: type = 'polyline';

    draw = () => {
        this.drawPoints();
    }

    drawPreview = (next: Point) => {
        if (!this.points.length) { return; }
        this.drawPoints(true);
        next = this.getSnappedPoint(next).newPoint;
        this.ctx.beginPath();
        this.ctx.moveTo(...this.points[this.points.length - 1].coordinates);
        this.ctx.lineTo(...next.coordinates);
        this.ctx.stroke();
    }

    click = (next: Point) => {
        let sr: SnappingResult;
        if (this.points.length) {
            sr = this.getSnappedPoint(next);
            next = sr.newPoint;
        } else {
            next = this.snapPointToGrid(next);
        }
        this.points.push(next);
        if (sr && sr.snappedTo === snappedToEnum.POINT) {
            this.$finished.next(this);
            console.log('Created polyline at points: ', ...this.points);
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


        let ptSnap = this.checkPointSnap(pt);
        if (ptSnap !== pt) {
            return {
                newPoint: ptSnap,
                snappedTo: snappedToEnum.POINT
            };
        }

        pt = this.snapPointToGrid(pt);
        ptSnap = this.checkPointSnap(pt);
        if (ptSnap !== pt) {
            return {
                newPoint: ptSnap,
                snappedTo: snappedToEnum.POINT
            };
        }


        if (!this.workspaceContext.angleSnapSettings.snap) {
            return {
                newPoint: pt,
                snappedTo: snappedToEnum.NULL
            };
        }

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
        ptSnap = this.checkPointSnap(angledPoint);
        return ptSnap === angledPoint ? {
            newPoint: angledPoint,
            snappedTo: snappedToEnum.ANGLE
        } : {
                newPoint: ptSnap,
                snappedTo: snappedToEnum.POINT
            };
    }

    private checkPointSnap(pt: Point): Point {
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
            return closestPoint;
        } else {
            return pt;
        }
    }

    private getExpandedSnappingAngles(): number[] {
        return Array.from(new Set(this.workspaceContext.angleSnapSettings.angles.reduce((acc, angle) => {
            let multiple = angle;
            while (multiple < 360) {
                acc.push(multiple);
                multiple += angle;
            }
            return acc;
        }, [0, 360]))).sort((a, b) => a - b);
    }

    private drawPoints(drawHandles = false): void {
        if (drawHandles) { this.drawHandle(this.points[0]); }
        for (let idx = 1; idx < this.points.length; idx++) {
            const pt = this.points[idx];
            if (drawHandles) { this.drawHandle(pt); }
            this.drawSegment(this.points[idx - 1], pt);
        }
    }

    private drawHandle(pt: Point, next?: Point): void {
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, this.pointSnapMagnitude, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    private drawSegment(first: Point, second: Point): void {
        this.ctx.beginPath();
        this.ctx.moveTo(...first.coordinates);
        this.ctx.lineTo(...second.coordinates);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

enum snappedToEnum {
    NULL,
    POINT,
    ANGLE,
    GRID
}

interface SnappingResult {
    snappedTo: snappedToEnum;
    newPoint: Point;
}
