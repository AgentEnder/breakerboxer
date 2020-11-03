import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DrawingMode } from 'src/app/core/models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {

  @Output() undo = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() toolSelected = new EventEmitter<DrawingMode>();

  #displayGrid = true;
  @Output() displayGridChange = new EventEmitter<boolean>();
  @Input() set displayGrid(v: boolean) {
    this.#displayGrid = v;
    this.displayGridChange.emit(v);
    this.contextChange.emit();
  }

  @Output() gridSnapChange = new EventEmitter<boolean>();
  #gridSnap = true;
  @Input() set gridSnap(v: boolean) {
    this.#gridSnap = v;
    this.gridSnapChange.emit(v);
    this.contextChange.emit();
  }
  get gridSnap(): boolean {
    return this.#gridSnap;
  }

  #angleSnap = true;
  @Output() angleSnapChange = new EventEmitter<boolean>();
  @Input() set angleSnap(v: boolean) {
    this.#angleSnap = v;
    this.angleSnapChange.emit(v);
    this.contextChange.emit();
  }
  get angleSnap(): boolean {
    return this.#angleSnap;
  }

  #angles: number[];
  @Output() anglesChange = new EventEmitter<number[]>();
  @Input() set angles(v: number[]) {
    this.#angles = v;
    this.anglesChange.emit(v);
    this.contextChange.emit();
  }
  get angles(): number[] {return this.#angles; }

  @Output() contextChange = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
