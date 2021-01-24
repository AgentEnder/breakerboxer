import { createAction } from '@ngrx/store';

import { User } from '../models';

export namespace UserActions {
    export const logIn = createAction(
        '[@user] sign in',
    );

    export const logInSuccess = createAction(
        '[@user] sign in successful',
        (payload: { user: User }) => payload
    );

    export const logInFailed = createAction(
        '[@user] sign in failed',
        (payload: any) => payload
    );

    export const logOut = createAction(
        '[@user] log out'
    );

    export const logOutSuccess = createAction(
        '[@user] log out success'
    );
}
