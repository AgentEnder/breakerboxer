import { Subject } from 'rxjs';

import { OnDestroy, Component } from '@angular/core';

@Component({template: ''})
export class BaseComponent implements OnDestroy {
    private destroySubject = new Subject<boolean>();
    protected destroy$ = this.destroySubject.asObservable();

    ngOnDestroy(): void {
        this.destroySubject.next(true);
    }
}
