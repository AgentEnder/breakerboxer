import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthService } from '@tbs/user';

import { GameDataService } from './services/game-data.service';
import { GamesDbApiKeyInterceptor } from './services/the-games-db.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    GameDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GamesDbApiKeyInterceptor,
      multi: true
    }
  ]
})
export class GamesDataModule {}
