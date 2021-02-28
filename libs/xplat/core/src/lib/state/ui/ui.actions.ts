import { createAction, props } from '@ngrx/store';
import { UIState } from './ui.state';

export namespace UIActions {
  export const initializeUIState = createAction(
    '[@tbs ui] initialize',
    (payload: { state: Partial<UIState.IState> }) => payload
  );

  export const setDarkMode = createAction(
    '[@tbs ui] set dark mode',
    (payload: { state: boolean }) => payload
  );

  export const setDarkModeSuccess = createAction(
    '[@tbs ui] set dark mode success',
    (payload: { state: boolean }) => payload
  );

  export const setDarkModeFailed = createAction('[@tbs ui] set dark mode failed', (payload: any) => payload);

  export const showSidebarCollapse = createAction(
    '[@tbs ui] showSidebarCollapse',
    props<{ state: boolean }>()
  );

  export const toggleSidebarCollapsed = createAction(
    '[@tbs ui] toggle sidebar collapsed',
    props<{ state?: boolean }>()
  );
}
