import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TitleService {
    titleSubject: ReplaySubject<string> = new ReplaySubject(1);
    title$ = this.titleSubject.asObservable();

    constructor(private _title: Title) {
        this.setTitle(this.getPageTitle(), false);
    }

    setTitle(title: string, setPageTitle = true): void {
        this.titleSubject.next(title);
        if (setPageTitle) {
            this._title.setTitle(title);
        }
    }

    getPageTitle(): string {
        return this._title.getTitle();
    }
}
