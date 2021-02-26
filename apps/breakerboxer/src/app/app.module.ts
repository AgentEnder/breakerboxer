import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TbsCoreModule } from '@tbs/xplat/web/core';
import { LayoutModule } from '@tbs/layout';
import {FirebaseModule} from '@tbs/firebase';


import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TbsCoreModule,
    OverlayModule,
    LayoutModule,
    FirebaseModule.forRoot(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
