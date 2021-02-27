import { from, Observable, Subject } from 'rxjs';

import { BaseModel, type, Point } from '@tbs/xplat/core';
import { WorkspaceContext } from '../workspace-context';
import { DrawingMode } from '../drawing-modes';
import { IDrawable } from './idrawable';

export abstract class Drawable extends BaseModel implements IDrawable {
  altClick?: (coordinates: Point) => void;
  abstract draw: () => void;
  abstract drawPreview?: (next: Point) => void;
  abstract click: (coordinates: Point) => void;
  abstract undo: () => void;
  abstract name: DrawingMode;

  protected ctx: CanvasRenderingContext2D;
  workspaceContext: WorkspaceContext;

  protected $finished = new Subject<IDrawable>();
  finished: Observable<IDrawable> = from(this.$finished);

  type: type = 'drawable';

  constructor(context: WorkspaceContext) {
    super();
    this.ctx = context.ctx;
    this.workspaceContext = context;
  }

  protected snapPointToGrid(pt: Point): Point {
    const settings = this.workspaceContext;
    if (settings.grid.snap) {
      const [ptDeltaX, ptDeltaY] = [pt.x % settings.grid.gridSizeX, pt.y % settings.grid.gridSizeY];
      const snappedPoint = new Point(pt.x, pt.y);
      snappedPoint.x =
        ptDeltaX < settings.grid.gridSizeX / 2
          ? snappedPoint.x - ptDeltaX
          : snappedPoint.x + (settings.grid.gridSizeX - ptDeltaX);
      snappedPoint.y =
        ptDeltaY < settings.grid.gridSizeY / 2
          ? snappedPoint.y - ptDeltaY
          : snappedPoint.y + (settings.grid.gridSizeY - ptDeltaY);
      return snappedPoint;
    }
    return pt;
  }
}
