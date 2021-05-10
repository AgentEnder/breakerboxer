import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { debounceTime, throttle } from 'rxjs/operators';

import { GameDataService, RAWG } from '@tbs/games-data';
import { Rating } from '@tbs/rating';

@Component({
  selector: 'emu-compat-rating-dialog',
  templateUrl: './rating-dialog.component.html',
})
export class RatingDialogComponent {
  rm: Rating[] = [];

  fg: FormGroup;

  filteredTargets: Partial<RAWG.Platform>[] = [];
  filteredGames: RAWG.Game[] = [];
  selectedGame: RAWG.Game;

  constructor(
    private dialogRef: MatDialogRef<RatingDialogComponent>,
    public gameData: GameDataService,
    private fb: FormBuilder
  ) {
    for (let _ = 0; _ < 30; _++) {
      this.rm.push({
        average: Math.random() * 5,
        count: Math.floor(Math.random() * 100 + 50),
        mine: null,
      });
    }
    this.fg = this.fb.group({
      gameControl: new FormControl('', Validators.required),
      emulationTargetControl: new FormControl('', Validators.required),
    });
    this.fg.controls.emulationTargetControl.valueChanges.subscribe((x) => {
      if (typeof x === 'string') {
        this.loadFilteredTargets(x);
      }
    });
    this.fg.controls.gameControl.valueChanges.pipe(debounceTime(150)).subscribe((x) => {
      if (typeof x !== 'object') {
        this.loadFilteredGames(x);
      } else {
        this.loadDataForGame(x);
      }
    });
  }

  submit(): void {
    this.dialogRef.close();
  }

  getName = (obj) => obj.name;

  loadFilteredTargets(filter: string): void {
    if (this.selectedGame) {
      this.filteredTargets = this.selectedGame.platforms
        .map((x) => x.platform)
        .filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
    }
  }

  loadFilteredGames(search: string): void {
    this.gameData.searchGames(search).subscribe((x) => {
      this.filteredGames = x;
    });
  }

  loadDataForGame(x: RAWG.Game): void {
    this.filteredTargets = x.platforms.map((plt) => plt.platform);
    if (
      this.filteredTargets.findIndex((plt) => plt.name === this.fg.controls.emulationTargetControl.value) ===
      -1
    ) {
      this.fg.controls.emulationTargetControl.reset();
    }
    this.selectedGame = x;
  }
}
