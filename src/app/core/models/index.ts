import { IDrawable } from './drawables/idrawable';
import { Polyline } from './drawables/polyline';
import { Rectangle } from './drawables/rectangle';
import { DrawingMode } from './drawing-modes';

export * from './drawing-modes';
export * from './point';
export * from './drawables/polyline';
export * from './drawables/rectangle';
export * from './drawables/idrawable';

type DrawableMapping = {
    [key in DrawingMode]: () => IDrawable
};

export const DrawableMap: DrawableMapping = {
    polyline: () => new Polyline(),
    rectangle: () => new Rectangle()
};
