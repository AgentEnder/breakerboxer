import { Component, OnInit, ViewChild } from '@angular/core';
import { SnapSettings } from '../core/models/workspace-context';
import { CanvasComponent } from './canvas/canvas.component';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styles: [':host {display: flex; flex-grow: 1; flex-direction: column}']
})
export class WorkspacePageComponent implements OnInit {

  @ViewChild(CanvasComponent) canvas: CanvasComponent;

  constructor() { }

  ngOnInit(): void {
  }

  setSnapSettings(settings: SnapSettings): void {
    Object.assign(this.canvas.context, settings);
  }

}
