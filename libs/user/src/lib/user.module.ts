import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserState } from './state';
import { UserEffects } from './state/user.effects';
import { userReducer } from './state/user.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(UserState.key, userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
})
export class UserModule {}
