import { Injectable, Optional } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { LocalStorageService } from '../../core/services/local-storage.service';
import { from, Subject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

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
        private mediaMatcher: MediaMatcher,
        private storageService: LocalStorageService,
    ) {
        const saved = this.storageService.retrieveLocalStorage<string>('dark-mode');
        console.log(saved);
        switch (saved) {
            case 'light':
                this._dark = false;
                break;
            case 'dark':
                this._dark = true;
                break;
            default:
                const prefersDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
                const prefersLight = this.mediaMatcher.matchMedia('(prefers-color-scheme: light)').matches;
                this.storageService.setLocalStorage(
                    'dark-mode',
                    prefersDark
                    ? 'dark'
                    : prefersLight
                      ? 'light'
                      : 'unknown');
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
