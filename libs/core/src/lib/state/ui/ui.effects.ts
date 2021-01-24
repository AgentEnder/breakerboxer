import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LocalStorageService } from '../../services';
import { UIActions } from './ui.actions';

import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UIEffects implements OnInitEffects {

    persistDarkMode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UIActions.setDarkMode),
            switchMap(({ state }) => this.storageService.setLocalStorage$('dark-mode', state ? 'dark' : 'light').pipe(
                mergeMap(() => [UIActions.setDarkModeSuccess({ state })])
            )),
            catchError((err) => of(UIActions.setDarkModeFailed(err)))
        )
    );

    constructor(
        private actions$: Actions,
        private _platform: Platform,
        private mediaMatcher: MediaMatcher,
        private storageService: LocalStorageService,
    ) {
    }

    ngrxOnInitEffects(): Action {
        const dark = this.getPreferredDarkMode();
        return UIActions.initializeUIState({
            state: {
                darkMode: dark
            }
        });
    }

    private getPreferredDarkMode(): boolean {
        // local storage property set after initial load
        const saved = this.storageService.retrieveLocalStorage<string>('dark-mode');
        let dark: boolean;
        switch (saved) {
            case 'light':
                dark = false;
                break;
            case 'dark':
                dark = true;
                break;
            default: // determine at runtime preferred scheme
                let prefersDark = false;
                let prefersLight = false;
                if (this._platform.isBrowser) {
                    prefersDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
                    prefersLight = this.mediaMatcher.matchMedia('(prefers-color-scheme: light)').matches;
                }
                this.storageService.setLocalStorage(
                    'dark-mode',
                    prefersDark
                        ? 'dark' // user prefers dark mode
                        : prefersLight
                            ? 'light' // user prefers light mode
                            // setting this to neither dark nor light causes a new runtime check the next time the app is loaded.
                            : 'unknown');
                dark = prefersDark;
                break;
        }
        return dark;
    }
}
