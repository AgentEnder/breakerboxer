import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styles: [':host {display: flex; flex-grow: 1; flex-direction: column}']
})
export class WorkspacePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
