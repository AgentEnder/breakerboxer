import { IDrawable } from './drawables/idrawable';
import { Polyline } from './drawables/polyline';
import { Rectangle } from './drawables/rectangle';
import { DrawingMode } from './drawing-modes';
import { WorkspaceContext } from './workspace-context';

export * from './drawing-modes';
export * from './workspace-context';
export * from './drawables/drawable';
export * from './drawables/idrawable';
export * from './drawables/polyline';
export * from './drawables/rectangle';
export * from './room';
export * from './electrical-components';

type DrawableMapping = {
    [key in DrawingMode]: (ctx: WorkspaceContext) => IDrawable
};

export const DrawableMap: DrawableMapping = {
    polyline: (ctx: WorkspaceContext) => new Polyline(ctx),
    rectangle: (ctx: WorkspaceContext) => new Rectangle(ctx)
};
