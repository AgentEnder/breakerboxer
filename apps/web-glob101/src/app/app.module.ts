import { NgModule } from '@angular/core';

// libs
import { TbsCoreModule } from '@tbs/xplat/web/core';
import { LayoutModule } from '@tbs/layout';
import { FirebaseModule } from '@tbs/firebase';

import { environment } from '../environments/environment';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
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
