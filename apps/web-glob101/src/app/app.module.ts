import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FirebaseModule } from '@tbs/firebase';
import { LayoutModule } from '@tbs/layout';
// libs
import { TbsCoreModule } from '@tbs/xplat/web/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TbsCoreModule,
    CoreModule,
    OverlayModule,
    LayoutModule,
    SharedModule,
    FirebaseModule.forRoot(environment.firebase),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
