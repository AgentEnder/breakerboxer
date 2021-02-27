export class Point {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get coordinates(): [number, number] {
    return [this.x, this.y];
  }
}
