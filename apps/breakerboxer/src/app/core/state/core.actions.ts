import { createAction } from '@ngrx/store';
import { CoreState } from './core.state';

export namespace CoreActions {
  export const loadedAction = createAction(
    '[breakerboxer/core] loaded',
    (payload: CoreState.IState = {}) => payload
  );
}
