import { createAction } from '@ngrx/store';
import { UIState } from './ui.state';

export namespace UIActions {
    export const setDarkMode = createAction(
        '[@ui] set dark mode',
        ((payload: {state: boolean}) => payload)
    );
    
    export const setDarkModeSuccess = createAction(
        '[@ui] set dark mode success',
        ((payload: {state: boolean}) => payload)
    );
    
    export const setDarkModeFailed = createAction(
        '[@ui] set dark mode failed',
        ((payload: any) => payload)
    );

    export const initializeUIState = createAction(
        '[@ui] initialize',
        ((payload: {state: Partial<UIState.IState>}) => payload)
    );
}