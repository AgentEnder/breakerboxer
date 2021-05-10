import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { GameDataService } from './services/game-data.service';
import { GamesDbApiKeyInterceptor } from './services/the-games-db.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    GameDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GamesDbApiKeyInterceptor,
      multi: true,
    },
  ],
})
export class GamesDataModule {}
