import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { breakerboxerDataReducer } from "./state/breakerboxer.reducer";

@NgModule({
    imports: [
        StoreModule.forFeature('breakerboxer', breakerboxerDataReducer),
        EffectsModule.forFeature([])
    ]
})
export class BreakerboxerDataModule {

}