import { Component } from '@angular/core';

import { DarkModeService } from './layout/dark-mode-switch/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'BreakerBoxer';

  constructor(public darkService: DarkModeService) {

  }
}
