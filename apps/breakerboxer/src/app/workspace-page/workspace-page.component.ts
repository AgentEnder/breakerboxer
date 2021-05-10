import { Component, OnInit, ViewChild } from '@angular/core';

import { CanvasComponent } from '@tbs/web/bb-workspace';
import { SnapSettings } from '@tbs/xplat/base/breakerboxer-data';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styles: [':host {display: flex; flex-grow: 1; flex-direction: column}'],
})
export class WorkspacePageComponent implements OnInit {
  @ViewChild(CanvasComponent) canvas: CanvasComponent;

  constructor() {}

  ngOnInit(): void {}
}
