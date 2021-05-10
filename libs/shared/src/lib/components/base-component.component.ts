import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Component({ template: '' })
export class BaseComponent implements OnDestroy {
  private destroySubject = new Subject<boolean>();
  protected destroy$ = this.destroySubject.asObservable();

  ngOnDestroy(): void {
    this.destroySubject.next(true);
  }
}
