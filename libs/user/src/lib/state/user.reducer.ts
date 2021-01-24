import { Action, createReducer, on } from '@ngrx/store';

import { UserActions } from './user.action';
import { UserState } from './user.state';

const reducer = createReducer(UserState.initialState,
    on(UserActions.logInSuccess, (state, {user}) => ({
        ...state,
        signedInUser: user
    })),
    on(UserActions.logOutSuccess, (state, _) => ({
        ...state,
        signedInUser: null
    }))
);

export function userReducer(
    state: UserState.IState,
    action: Action
): UserState.IState {
    return reducer(state, action);
}
