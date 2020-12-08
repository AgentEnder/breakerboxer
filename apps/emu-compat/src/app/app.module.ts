import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { CoreModule } from '@tbs/core';
import { LayoutModule } from '@tbs/layout';
import { RatingModule } from '@tbs/web/rating';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { GamesDataModule } from '@tbs/games-data';
import { UserModule } from '@tbs/user';

@NgModule({
  declarations: [
    AppComponent,
    RatingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    CoreModule,
    OverlayModule,
    LayoutModule,
    RatingModule,
    MatFormFieldModule,
    MatSelectModule,
    GamesDataModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
