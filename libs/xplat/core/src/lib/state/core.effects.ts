import { Injectable } from "@angular/core";
import { OnInitEffects } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { CoreActions } from "./core.actions";

@Injectable()
export class CoreEffects implements OnInitEffects {
    constructor(private store: Store) {}
    
    ngrxOnInitEffects(): Action {
        return CoreActions.AppInit();
    }
}