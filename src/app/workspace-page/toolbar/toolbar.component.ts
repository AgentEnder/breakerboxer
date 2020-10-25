import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
