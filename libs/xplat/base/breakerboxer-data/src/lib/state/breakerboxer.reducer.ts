import { createReducer, on } from "@ngrx/store";
import { BreakerboxerState } from "./breakerboxer.state";

const reducer = createReducer(BreakerboxerState.initialState);

export function breakerboxerDataReducer(state, action) {
    return reducer(state, action)
}