import { from, Observable, Subject } from 'rxjs';
import { DrawingMode } from '../drawing-modes';
import { Point } from '../point';
import { IDrawable } from './idrawable';
import {v4 as Guid} from 'uuid';

export abstract class Drawable implements IDrawable {
    abstract draw: (ctx: CanvasRenderingContext2D) => void;
    abstract drawPreview?: (ctx: CanvasRenderingContext2D, next: Point) => void;
    abstract click: (coordinates: Point) => void;
    abstract undo: () => void;
    abstract name: DrawingMode;

    protected $finished = new Subject<IDrawable>();
    finished: Observable<IDrawable> = from(this.$finished);

    private _guid: string;

    public get guid(): string {
        return this._guid;
    }

    constructor() {
        this._guid = Guid();
    }
}
