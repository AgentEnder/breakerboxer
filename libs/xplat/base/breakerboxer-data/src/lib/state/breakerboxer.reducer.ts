import { createReducer, on } from '@ngrx/store';
import { BreakerboxerActions } from './breakerboxer.action';
import { BreakerboxerState } from './breakerboxer.state';

const reducer = createReducer(
  BreakerboxerState.initialState,
  on(BreakerboxerActions.toggleAngleSnap, (state, { angleSnap }) => ({
    ...state,
    angleSnapSettings: {
      ...state.angleSnapSettings,
      snap: angleSnap,
    },
    gridSettings: {
      ...state.gridSettings,
      snap: angleSnap ? false : state.gridSettings.snap,
    },
  })),
  on(BreakerboxerActions.toggleGridSnap, (state, { gridSnap }) => ({
    ...state,
    angleSnapSettings: {
      ...state.angleSnapSettings,
      snap: gridSnap ? false : state.angleSnapSettings.snap,
    },
    gridSettings: {
      ...state.gridSettings,
      snap: gridSnap,
    },
  })),
  on(BreakerboxerActions.setGridXSize, (state, { sizeX }) => ({
    ...state,
    gridSettings: {
      ...state.gridSettings,
      gridSizeX: sizeX,
    },
  })),
  on(BreakerboxerActions.setGridYSize, (state, { sizeY }) => ({
    ...state,
    gridSettings: {
      ...state.gridSettings,
      gridSizeX: sizeY,
    },
  })),
  on(BreakerboxerActions.toggleDisplayGrid, (state, { displayGrid }) => ({
    ...state,
    gridSettings: {
      ...state.gridSettings,
      displayGrid,
    },
  })),
  on(BreakerboxerActions.setSnapAngles, (state, { angles }) => ({
    ...state,
    angleSnapSettings: {
      ...state.angleSnapSettings,
      angles,
    },
  }))
);

export function breakerboxerDataReducer(state, action) {
  return reducer(state, action);
}
