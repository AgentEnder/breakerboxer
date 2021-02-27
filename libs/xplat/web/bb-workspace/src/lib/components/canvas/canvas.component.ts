import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@tbs/shared';
import {
  BreakerboxerState,
  DrawableMap,
  DrawingMode,
  IDrawable,
  SnapSettings,
  WorkspaceContext,
} from '@tbs/xplat/base/breakerboxer-data';
import { Point, UIState } from '@tbs/xplat/core';

@Component({
  selector: 'breakerboxer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent extends BaseComponent implements AfterViewInit {
  @Input() public drawingMode: DrawingMode = 'polyline';

  @ViewChild('workspaceCanvas') canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private drawables: IDrawable[] = [];
  private inProgressDrawable: IDrawable;
  private drawing = false;
  private lastKnownMousePoint: Point;
  private drawingSubscription: Subscription;
  private panX = 0;
  private panY = 0;
  private scaleFactor = 1;
  private darkMode: boolean;
  private snapSettings: SnapSettings;

  constructor(private el: ElementRef<HTMLElement>, private store: Store, private dialogService: MatDialog) {
    super();
    this.store
      .select(UIState.selectDarkMode)
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((dark) => {
        this.darkMode = dark;
        this.render();
      });

    this.store
      .select(BreakerboxerState.selectSnapSettings)
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.snapSettings = x;
        if (this.inProgressDrawable) {
          this.inProgressDrawable.workspaceContext = this.getCurrentContext();
        }
        this.render();
      });
  }

  public clear(): void {
    this.drawables = [];
    this.panX = 0;
    this.panY = 0;
    this.scaleFactor = 1;
    this.render();
  }

  public undo(): void {
    if (this.drawing && this.inProgressDrawable) {
      this.inProgressDrawable.undo();
    } else {
      this.drawables.pop();
    }
    this.render(this.lastKnownMousePoint);
  }

  ngAfterViewInit(): void {
    const canvasElement = this.canvas.nativeElement;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // @ts-ignore
    const obs = new ResizeObserver(() => this.setCanvasPxSize()).observe(canvasElement);
    // setTimeout(() => {
    //   this.setCanvasPxSize();
    // }, 1000); // timeout handles some weirdness with scaling not being stable due to angular/material drawer.
  }

  setCanvasPxSize(): void {
    const canvasElement = this.canvas.nativeElement;
    canvasElement.width = this.el.nativeElement.clientWidth;
    canvasElement.height = this.el.nativeElement.clientHeight;
    this.render();
  }

  onClick(event: Partial<MouseEvent>): void {
    const pt = this.getCanvasXY(event);
    // LEFT CLICK
    if (event.button === 0) {
      if (!this.inProgressDrawable) {
        this.startDrawing(pt);
      } else {
        this.inProgressDrawable.click(pt);
      }
      // RIGHT CLICK, Drawing in progress
    } else if (event.button === 2) {
      if (this.inProgressDrawable) {
        if (this.inProgressDrawable.altClick) {
          this.inProgressDrawable.altClick(pt);
        } else {
          this.resetDrawingAction();
        }
      } else {
        // RIGHT CLICK, not drawing: PAN
        fromEvent(this.canvas.nativeElement, 'mousemove')
          .pipe(
            // when user hits mouse down start listening to mouse movement
            takeUntil(
              fromEvent(this.canvas.nativeElement, 'mouseup').pipe(
                // stop this whenever they let up of the mouse
                filter((x: MouseEvent) => x.button === 2), // iff it was the right mouse button
                // Map should fire right before takeUntil clears the event.
                map((x) => {
                  this.canvas.nativeElement.style.removeProperty('cursor');
                })
              )
            )
          )
          .subscribe((evt: MouseEvent) => {
            // apply panning and re-render
            this.canvas.nativeElement.style.cursor = 'grab';
            this.panX += evt.movementX;
            this.panY += evt.movementY;
            this.render();
          });
      }

      event.preventDefault();
    }
  }

  onScroll(event: any): void {
    console.log(event);
    event.preventDefault(); // Prevent page from scrolling when user tries to zoom

    // This section applies the actual zoom.
    if (event.deltaY < 0) {
      this.scaleFactor *= 1.25;
    } else {
      this.scaleFactor /= 1.25;
    }

    // This section applies extra panning when the user zooms. This is meant to provide better UX and zoom towards mouse cursor.
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    const [canvasX, canvasY] = this.getRawCanvasXY(event).coordinates;
    this.panX += (width / 2 - canvasX) * this.scaleFactor;
    this.panY += (height / 2 - canvasY) * this.scaleFactor;

    this.render();
  }

  onMouseMove(event: MouseEvent): void {
    this.lastKnownMousePoint = this.getCanvasXY(event);
    if (this.drawing) {
      this.render(this.lastKnownMousePoint);
    }
  }

  startDrawing(pt: Point): void {
    this.drawing = true;
    this.inProgressDrawable = DrawableMap[this.drawingMode](this.getCurrentContext());
    this.inProgressDrawable.click(pt);
    const subscription = this.inProgressDrawable.finished.subscribe((x) => {
      if (x) {
        this.finishDrawing(x);
        console.log(`Finished drawing ${x}`);
      } else {
        console.log('Failed to draw shape');
        this.resetDrawingAction();
      }
      subscription.unsubscribe();
    });
    this.render();
  }

  finishDrawing(drawable: IDrawable): void {
    this.drawables.push(drawable);
    if (this.drawingMode === 'polyline' || this.drawingMode === 'rectangle') {
      // this.dialogService.open(CreateRoomDialogComponent, {data: {drawable}, disableClose: true});
      // TODO: Create room on room mode completion
    }
    this.resetDrawingAction();
  }

  public render(mousePosition?: Point): void {
    if (!this.ctx) {
      return;
    }

    mousePosition = mousePosition || this.lastKnownMousePoint;

    // Handle dark mode styles
    if (this.darkMode) {
      this.ctx.strokeStyle = 'white';
      this.ctx.fillStyle = 'white';
    } else {
      this.ctx.strokeStyle = 'black';
      this.ctx.fillStyle = 'black';
    }

    // Clear last frame
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Handle translations
    this.ctx.translate(this.panX, this.panY);
    this.ctx.scale(this.scaleFactor, this.scaleFactor);

    if (this.snapSettings.gridSettings.displayGrid) {
      this.drawGrid();
    }

    // Draw each item in queue
    this.drawables.forEach((x) => x.draw());
    if (this.inProgressDrawable && this.inProgressDrawable.drawPreview && mousePosition) {
      this.inProgressDrawable.drawPreview(mousePosition);
    }
  }

  drawGrid(): void {
    const oldStyle = this.ctx.strokeStyle;
    this.ctx.strokeStyle = this.darkMode ? '#565656' : '#e3e3e3';
    let [left, top, right, bottom] = this.getWorldSpaceBorderRect();

    const hspace = this.snapSettings.gridSettings.gridSizeX;
    const vspace = this.snapSettings.gridSettings.gridSizeY;
    const gridOffsetPt = this.getWorldSpacePoint(new Point(0, 0));
    const gridOffsetX = gridOffsetPt.x % hspace;
    const gridOffsetY = gridOffsetPt.y % vspace;
    left += -gridOffsetX - hspace;
    right += -gridOffsetX + hspace;
    top += -gridOffsetY - vspace;
    bottom += -gridOffsetY + vspace;
    let [x, y] = [left, top];

    this.ctx.beginPath();

    while (x <= right) {
      this.ctx.moveTo(x, top);
      this.ctx.lineTo(x, bottom);
      x += hspace;
    }
    while (y <= bottom) {
      this.ctx.moveTo(left, y);
      this.ctx.lineTo(right, y);
      y += vspace;
    }

    this.ctx.stroke();
    this.ctx.strokeStyle = oldStyle;
  }

  resetDrawingAction(): void {
    this.inProgressDrawable = null;
    this.drawing = false;
    if (this.drawingSubscription) {
      this.drawingSubscription.unsubscribe();
    }
    this.render();
  }

  getCanvasXY(event: Partial<MouseEvent>): Point {
    const [x, y] = this.getRawCanvasXY(event).coordinates;
    return this.getWorldSpacePoint(new Point(x, y));
  }

  getWorldSpacePoint(pt: Point): Point {
    const matrix = this.ctx.getTransform();
    return new Point((pt.x - matrix.e) / matrix.a, (pt.y - matrix.f) / matrix.d);
  }

  getRawCanvasXY(event: Partial<MouseEvent>): Point {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return new Point(x, y);
  }

  getWorldSpaceBorderRect(): [number, number, number, number] {
    const topLeft = new Point(0, 0);
    const bottomRight = new Point(this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const matrix = this.ctx.getTransform();
    const transformedTL = this.getWorldSpacePoint(topLeft);
    const transformedBR = this.getWorldSpacePoint(bottomRight);
    return [...transformedTL.coordinates, ...transformedBR.coordinates];
  }

  getCurrentContext = () => ({
    ctx: this.ctx,
    angle: this.snapSettings.angleSnapSettings,
    grid: this.snapSettings.gridSettings,
  });
}
