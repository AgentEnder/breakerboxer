import { from, Subject } from 'rxjs';

import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, Optional } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { Platform } from '@angular/cdk/platform';

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {
    #darkField: boolean;
    private set _dark(v) {
        this.#darkField = v;
        this.darkSubject.next(v);
    }
    private get _dark(): boolean{
        return this.#darkField;
    }

    public get dark(): boolean {
        return this._dark;
    }

    private darkSubject = new Subject<boolean>();
    public dark$ = from(this.darkSubject);

    private overlay: HTMLElement;

    constructor(
        private _plaform: Platform,
        private mediaMatcher: MediaMatcher,
        private storageService: LocalStorageService,
    ) {
        // local storage property set after initial load
        const saved = this.storageService.retrieveLocalStorage<string>('dark-mode');
        switch (saved) {
            case 'light':
                this._dark = false;
                break;
            case 'dark':
                this._dark = true;
                break;
            default: // determine at runtime preferred scheme
                let prefersDark = false;
                let prefersLight = false;
                if (_plaform.isBrowser) {
                   prefersDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
                   prefersLight = this.mediaMatcher.matchMedia('(prefers-color-scheme: light)').matches;
                }
                this.storageService.setLocalStorage(
                    'dark-mode',
                    prefersDark
                    ? 'dark' // user prefers dark mode
                    : prefersLight
                      ? 'light' // user prefers light mode
                      : 'unknown'); // setting this to neither dark nor light causes a new runtime check the next time the app is loaded.
                this._dark = prefersDark;
                break;
        }
    }

    darkToggle(): void {
        this._dark = !this._dark;
        if (this._dark) {
            this.storageService.setLocalStorage('dark-mode', 'dark');
        } else {
            this.storageService.setLocalStorage('dark-mode', 'light');
        }
    }

    setDarkMode(isDark: boolean): void {
        this._dark = isDark;
        if (isDark) {
            this.storageService.setLocalStorage('dark-mode', 'dark');
        } else {
            this.storageService.setLocalStorage('dark-mode', 'light');
        }
    }
}
