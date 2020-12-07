import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameDataService } from './services/game-data.service';

@NgModule({
  imports: [CommonModule],
  providers: [GameDataService]
})
export class GamesDataModule {}
