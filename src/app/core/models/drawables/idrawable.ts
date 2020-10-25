import { Observable, Subject } from 'rxjs';
import { Point } from '../point';

export interface IDrawable {
    draw: (ctx: CanvasRenderingContext2D) => void;
    drawPreview?: (ctx: CanvasRenderingContext2D, next: Point) => void;
    click: (coordinates: Point) => void;
    altClick?: (coordinates: Point) => void;
    undo: () => void;
    finished: Observable<IDrawable>;
    guid: string;
}
