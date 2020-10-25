import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DrawingMode } from 'src/app/core/models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() undo = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() toolSelected = new EventEmitter<DrawingMode>();

  @Output() displayGridChange = new EventEmitter<boolean>();
  @Input() displayGrid = true;

  @Output() angleSnapChange = new EventEmitter<boolean>();
  @Input() angleSnap = true;


  constructor() { }

  ngOnInit(): void {
  }

  toggleGrid(): void {
    this.displayGrid = !this.displayGrid;
    this.displayGridChange.emit(this.displayGrid);
  }

  toggleAngleSnap(): void {
    this.angleSnap = !this.angleSnap;
    this.angleSnapChange.emit(this.angleSnap);
  }

}
