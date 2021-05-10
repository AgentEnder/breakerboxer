import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@tbs/xplat/core';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styles: [
    `
      mat-card {
        min-height: 85vh;
      }
    `,
  ],
})
export class DocumentsPageComponent extends BaseComponent implements OnInit {
  href$: Observable<string>;

  constructor(route: ActivatedRoute) {
    super();
    this.href$ = route.queryParamMap.pipe(
      takeUntil(this.destroy$),
      map((x) => x.get('href'))
    );
  }

  ngOnInit(): void {}
}
