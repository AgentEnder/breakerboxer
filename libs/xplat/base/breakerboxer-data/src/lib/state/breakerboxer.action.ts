import {createAction} from '@ngrx/store';
import { Drawable } from '../models';

export namespace BreakerboxerActions {
    export const addDrawable = createAction(
        '[@tbs breakerboxer] add drawable', 
        (payload: {drawable: Drawable}) => payload
    );

    export const toggleGridSnap = createAction(
        '[@tbs breakerboxer] toggle grid snap',
        (payload: {gridSnap: boolean}) => payload
    );
    
    export const toggleDisplayGrid = createAction(
        '[@tbs breakerboxer] toggle display grid',
        (payload: {displayGrid: boolean}) => payload
    );
    
    export const setGridXSize = createAction(
        '[@tbs breakerboxer] toggle grid x size',
        (payload: {sizeX: number}) => payload
    );
    
    export const setGridYSize = createAction(
        '[@tbs breakerboxer] toggle grid y size',
        (payload: {sizeY: number}) => payload
    );

    export const toggleAngleSnap = createAction(
        '[@tbs breakerboxer] toggle angle snap',
        (payload: {angleSnap: boolean}) => payload
    );
    
    export const setSnapAngles = createAction(
        '[@tbs breakerboxer] set snap angles',
        (payload: {angles: number[]}) => payload
    );
    
}