import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FirebaseModule } from '@tbs/firebase';
import { LayoutModule } from '@tbs/layout';
import { TbsCoreModule } from '@tbs/xplat/web/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BabyBabbleNamesState } from './state';
import { BabyBabbleNamesEffects } from './state/names.effects';
import { babyBabbleNamesReducer } from './state/names.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TbsCoreModule,
    OverlayModule,
    LayoutModule,
    FirebaseModule.forRoot(environment.firebase),
    StoreModule.forFeature(BabyBabbleNamesState.key, babyBabbleNamesReducer),
    EffectsModule.forFeature([BabyBabbleNamesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
