import { createFeatureSelector } from '@ngrx/store';

export namespace BreakerboxerState {
    export interface IState {
        
    }

    export const initialState: IState = {

    }

    const selectFeature = createFeatureSelector<IState>('breakerboxer');
}