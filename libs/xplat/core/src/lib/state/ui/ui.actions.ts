import { createAction } from '@ngrx/store';
import { UIState } from './ui.state';

export namespace UIActions {
  export const setDarkMode = createAction(
    '[@tbs ui] set dark mode',
    (payload: { state: boolean }) => payload
  );

  export const setDarkModeSuccess = createAction(
    '[@tbs ui] set dark mode success',
    (payload: { state: boolean }) => payload
  );

  export const setDarkModeFailed = createAction('[@tbs ui] set dark mode failed', (payload: any) => payload);

  export const initializeUIState = createAction(
    '[@tbs ui] initialize',
    (payload: { state: Partial<UIState.IState> }) => payload
  );
}
