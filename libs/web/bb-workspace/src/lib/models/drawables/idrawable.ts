import { Observable, Subject } from 'rxjs';
import { BaseModel, Point } from '@tbs/core';

export interface IDrawable extends BaseModel {
    draw: () => void;
    drawPreview?: (next: Point) => void;
    click: (coordinates: Point) => void;
    altClick?: (coordinates: Point) => void;
    undo: () => void;
    finished: Observable<IDrawable>;
    guid: string;
}
