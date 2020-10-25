import { from, Observable, Subject } from 'rxjs';
import { Point } from '../point';
import {IDrawable} from './idrawable';

export abstract class Drawable implements IDrawable {
    abstract draw: (ctx: CanvasRenderingContext2D) => void;
    abstract drawPreview?: (ctx: CanvasRenderingContext2D, next: Point) => void;
    abstract click: (coordinates: Point) => void;

    protected $finished = new Subject<IDrawable>();
    finished: Observable<IDrawable> = from(this.$finished);
}
