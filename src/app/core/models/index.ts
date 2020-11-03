import { IDrawable } from './drawables/idrawable';
import { Polyline } from './drawables/polyline';
import { Rectangle } from './drawables/rectangle';
import { DrawingMode } from './drawing-modes';
import { WorkspaceContext } from './workspace-context';

export * from './drawing-modes';
export * from './point';
export * from './drawables/polyline';
export * from './drawables/rectangle';
export * from './drawables/idrawable';

type DrawableMapping = {
    [key in DrawingMode]: (ctx: WorkspaceContext) => IDrawable
};

export const DrawableMap: DrawableMapping = {
    polyline: (ctx: WorkspaceContext) => new Polyline(ctx),
    rectangle: (ctx: WorkspaceContext) => new Rectangle(ctx)
};
