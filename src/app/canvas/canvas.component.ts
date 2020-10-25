import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { DrawingMode, IDrawable, Point, Wall } from '../core/models';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  @Input() public resX = 1920;
  @Input() public resY = 1080;
  @Input() public drawingMode: DrawingMode = 'wall';

  @ViewChild('workspaceCanvas') canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private drawables: IDrawable[] = [];
  private inProgressDrawable: IDrawable;
  private drawing = false;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    const canvasElement = this.canvas.nativeElement;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    canvasElement.width = this.resX;
    canvasElement.height = this.resY;
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
    if (this.drawing) {
      this.render(this.getCanvasXY(event));
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
        })
    }
  }

  finishDrawing(drawable: IDrawable): void {
    this.drawing = false;
    this.drawables.push(drawable);
    this.inProgressDrawable = null;
  }

  render(mousePosition?: Point): void {
    console.log('Rendering Canvas')
    this.ctx.clearRect(0,0, this.resX, this.resY);
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
