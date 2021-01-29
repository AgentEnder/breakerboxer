import {createAction} from '@ngrx/store';
import { Drawable } from '../models';

export namespace BreakerboxerActions {
    export const addDrawable = createAction(
        '[@tbs breakerboxer] add drawable', 
        (payload: {drawable: Drawable}) => payload
    );
}