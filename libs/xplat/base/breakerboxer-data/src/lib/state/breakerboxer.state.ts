import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AngleSnapSettings, GridSettings } from '../models';

export namespace BreakerboxerState {
    export interface IState {
        gridSettings: GridSettings;
        angleSnapSettings: AngleSnapSettings;
    }

    export const initialState: IState = {
        gridSettings: {
            displayGrid: true,
            gridSizeX: 50,
            gridSizeY: 50,
            snap: true
        },
        angleSnapSettings: {
            angles: [30, 45],
            snap: false
        }
    }

    const selectFeature = createFeatureSelector<IState>('breakerboxer');
    export const selectSnapSettings = createSelector(selectFeature, x => ({gridSettings: x.gridSettings, angleSnapSettings: x.angleSnapSettings}))
}