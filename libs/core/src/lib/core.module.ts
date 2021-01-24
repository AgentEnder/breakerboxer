import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { baseEnvironment } from './environment/environment.base';
import { LocalStorageService } from './services/local-storage.service';
import { UIEffects } from './state/ui/ui.effects';
import { uiReducer } from './state/ui/ui.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
      ui: uiReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: baseEnvironment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([UIEffects])
  ],
  providers: [LocalStorageService]
})
export class CoreModule { }
