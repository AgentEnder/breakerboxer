import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, pairwise, takeUntil } from 'rxjs/operators';

import { DarkModeService } from 'src/app/layout/dark-mode-switch/dark-mode.service';

import { DrawableMap, DrawingMode, IDrawable, Point, Polyline } from '../../core/models';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  @Input() public resX;
  @Input() public resY;
  @Input() public drawingMode: DrawingMode = 'polyline';

  #gridSnap = true;
  @Input() public set gridSnap(v) {
    this.#gridSnap = v;
    this.render();
  }
  public get gridSnap(): boolean {
    return this.#gridSnap;
  }

  #angleSnap = true;
  @Input() public set angleSnap(v) {
    this.#angleSnap = v;

    if (this.inProgressDrawable) {
      this.inProgressDrawable.angleSnap = v;
    }
  }
  public get angleSnap(): boolean {
    return this.#angleSnap;
  }


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
  private gridScale = 0.05;

  constructor(private el: ElementRef<HTMLElement>, private darkModeService: DarkModeService) { }

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
    if (this.resX && this.resY) {
      canvasElement.width = this.resX;
      canvasElement.height = this.resY;
    } else {
      setTimeout(() => {
        canvasElement.width = this.el.nativeElement.clientWidth;
        canvasElement.height = this.el.nativeElement.clientHeight;
      }, 1000); // timeout handles some weirdness with scaling not being stable due to angular/material drawer.
    }

    this.darkModeService.dark$.subscribe(x => {
      this.render(this.lastKnownMousePoint);
    });
  }

  onClick(event: MouseEvent): void {
    const pt = this.getCanvasXY(event);
    // LEFT CLICK
    if (event.button === 0) {
      if (!this.inProgressDrawable) {
        this.startDrawing(pt);
      }
      else {
        this.inProgressDrawable.click(pt);
      }
      // RIGHT CLICK, Drawing in progress
    } else if (this.inProgressDrawable && event.button === 2) {
      if (this.inProgressDrawable.altClick) { this.inProgressDrawable.altClick(pt); }
      else {
        this.resetDrawingAction();
      }

      event.preventDefault();
    } else { // RIGHT CLICK, not drawing: PAN
      fromEvent(this.canvas.nativeElement, 'mousemove').pipe( // when user hits mouse down start listening to mouse movement
        takeUntil(fromEvent(this.canvas.nativeElement, 'mouseup').pipe( // stop this whenever they let up of the mouse
          filter((x: MouseEvent) => x.button === 2) // iff it was the right mouse button
        )),
      ).subscribe((evt: MouseEvent) => { // apply panning and rerender
        this.panX += evt.movementX;
        this.panY += evt.movementY;
        this.render();
      });
    }
  }

  onScroll(event: WheelEvent): void {
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
    this.inProgressDrawable = DrawableMap[this.drawingMode]();
    this.inProgressDrawable.click(pt);
    this.inProgressDrawable.angleSnap = this.#angleSnap;
    const subscription = this.inProgressDrawable.finished.subscribe(x => {
      if (x) {
        this.finishDrawing(x);
        console.log(`Finished drawing ${x}`);
      } else {
        console.log('Failed to draw shape');
        this.resetDrawingAction();
      }
      subscription.unsubscribe();
    });
  }

  finishDrawing(drawable: IDrawable): void {
    this.drawables.push(drawable);
    this.resetDrawingAction();
  }

  render(mousePosition?: Point): void {
    // Handle darkmode styles
    if (this.darkModeService.dark) {
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

    if (this.#gridSnap) { this.drawGrid(); }

    // Draw each item in queue
    this.drawables.forEach(x => x.draw(this.ctx));
    if (this.inProgressDrawable && this.inProgressDrawable.drawPreview && mousePosition) {
      this.inProgressDrawable.drawPreview(this.ctx, mousePosition);
    }
  }

  drawGrid(): void {
    const oldStyle = this.ctx.strokeStyle;
    this.ctx.strokeStyle = '#e3e3e3';
    let [left, top, right, bottom] = this.getWorldSpaceBorderRect();
    console.dir({ left, top, right, bottom, w: right - left, h: top - bottom });

    const hspace = this.canvas.nativeElement.width * this.scaleFactor * this.gridScale;
    const vspace = this.canvas.nativeElement.height * this.scaleFactor * this.gridScale;
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

  getCanvasXY(event: MouseEvent): Point {
    const [x, y] = this.getRawCanvasXY(event).coordinates;
    return this.getWorldSpacePoint(new Point(x, y));
  }

  getWorldSpacePoint(pt: Point): Point {
    const matrix = this.ctx.getTransform();
    return new Point(
      (pt.x - matrix.e) / matrix.a,
      (pt.y - matrix.f) / matrix.d,
    );
  }

  getRawCanvasXY(event: MouseEvent): Point {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return new Point(x, y);
  }

  getWorldSpaceBorderRect(): ([number, number, number, number]) {
    const topLeft = new Point(0, 0);
    const bottomRight = new Point(this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const matrix = this.ctx.getTransform();
    const transformedTL = this.getWorldSpacePoint(topLeft);
    const transformedBR = this.getWorldSpacePoint(bottomRight);
    console.log(matrix);
    return [...transformedTL.coordinates, ...transformedBR.coordinates];
  }

}
