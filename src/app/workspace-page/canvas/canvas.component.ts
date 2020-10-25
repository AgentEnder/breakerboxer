import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { DarkModeService } from 'src/app/layout/dark-mode-switch/dark-mode.service';

import { DrawingMode, IDrawable, Point, Wall } from '../../core/models';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  @Input() public resX;
  @Input() public resY;
  @Input() public drawingMode: DrawingMode = 'wall';

  @ViewChild('workspaceCanvas') canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private drawables: IDrawable[] = [];
  private inProgressDrawable: IDrawable;
  private drawing = false;
  private lastKnownMousePoint: Point;

  constructor(private el: ElementRef<HTMLElement>, private darkModeService: DarkModeService) { }

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
      }, 1000);
    }

    this.darkModeService.dark$.subscribe(x => {
      this.render(this.lastKnownMousePoint);
    });
  }

  onClick(event: MouseEvent): void {
    const pt = this.getCanvasXY(event);
    if (event.button === 0) {
      if (!this.inProgressDrawable) {
        this.startDrawing(pt);
      }
      else {
        this.inProgressDrawable.click(pt);
      }
    }
  }

  onScroll(event: UIEvent): void {
    console.log(event);
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent): void {
    this.lastKnownMousePoint = this.getCanvasXY(event);
    if (this.drawing) {
      this.render(this.lastKnownMousePoint);
    }
  }

  startDrawing(pt: Point): void {
    this.drawing = true;
    switch (this.drawingMode) {
      case 'wall':
        this.inProgressDrawable = new Wall();
        this.inProgressDrawable.click(pt);
        const subscription = this.inProgressDrawable.finished.subscribe(x => {
          this.finishDrawing(x);
          console.log(`Finished drawing ${x}`);
          subscription.unsubscribe();
        });
    }
  }

  finishDrawing(drawable: IDrawable): void {
    this.drawing = false;
    this.drawables.push(drawable);
    this.inProgressDrawable = null;
  }

  render(mousePosition?: Point): void {
    if (this.darkModeService.dark) {
      this.ctx.strokeStyle = 'white';
    } else {
      this.ctx.strokeStyle = 'black';
    }
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight);
    this.drawables.forEach(x => x.draw(this.ctx));
    if (this.inProgressDrawable && this.inProgressDrawable.drawPreview && mousePosition) {
      this.inProgressDrawable.drawPreview(this.ctx, mousePosition);
    }
  }

  getCanvasXY(event: MouseEvent): Point {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return new Point(x, y);
  }

}
