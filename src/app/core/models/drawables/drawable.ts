import { from, Observable, Subject } from 'rxjs';

import { BaseModel } from '../base-model';
import { DrawingMode } from '../drawing-modes';
import { Point } from '../point';
import { IDrawable } from './idrawable';

export abstract class Drawable extends BaseModel implements IDrawable {
    altClick?: (coordinates: Point) => void;
    angleSnap: boolean;
    gridSnap: boolean;
    gridSnapSize: number;
    abstract draw: (ctx: CanvasRenderingContext2D) => void;
    abstract drawPreview?: (ctx: CanvasRenderingContext2D, next: Point) => void;
    abstract click: (coordinates: Point) => void;
    abstract undo: () => void;
    abstract name: DrawingMode;

    protected $finished = new Subject<IDrawable>();
    finished: Observable<IDrawable> = from(this.$finished);
}
