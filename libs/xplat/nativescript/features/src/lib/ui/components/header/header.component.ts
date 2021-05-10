import { Component } from '@angular/core';

import { RouterExtensions } from '@nativescript/angular';

import { HeaderBaseComponent } from '@tbs/xplat/features';

@Component({
  moduleId: module.id,
  selector: 'tbs-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent extends HeaderBaseComponent {
  constructor(private router: RouterExtensions) {
    super();
  }
}
