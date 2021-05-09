import { Component } from '@angular/core';

// xplat
import { AppBaseComponent } from '@tbs/xplat/web/features';

@Component({
  selector: 'tbs-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends AppBaseComponent {
  constructor() {
    super();
  }
}
