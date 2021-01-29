import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DrawingMode, SnapSettings } from '@tbs/xplat/base/breakerboxer-data';

@Component({
  selector: 'breakerboxer-ws-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {

  @Output() undo = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() toolSelected = new EventEmitter<DrawingMode>();

  @Input() snapSettings: SnapSettings = {
    angleSnapSettings: {
      angles: [],
      snap: true
    },
    gridSnapSettings: {
      displayGrid: true,
      gridSizeX: 50,
      gridSizeY: 50,
      snap: true
    }
  };

  @Output() snapSettingsChange = new EventEmitter<SnapSettings>();

  @Output() contextChange = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  setSnapSettings(settings: SnapSettings): void {
    this.snapSettingsChange.emit(settings);
    this.snapSettings = settings;
  }

}
