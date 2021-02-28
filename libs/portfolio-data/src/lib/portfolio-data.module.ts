import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PortfolioDataEffects } from './state/portfolio-data.effects';
import { portfolioDataReducer } from './state/portfolio-data.reducer';
import { PortfolioDataState } from './state/portfolio-data.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(PortfolioDataState.Key, portfolioDataReducer),
    EffectsModule.forFeature([PortfolioDataEffects]),
  ],
  exports: [],
  providers: [],
})
export class PortfolioDataModule {}
