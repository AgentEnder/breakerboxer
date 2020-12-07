import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { GameDataService } from '@tbs/games-data';
import { Rating } from '@tbs/rating';

@Component({
    selector: 'emu-compat-rating-dialog',
    templateUrl: './rating-dialog.component.html'
})
export class RatingDialogComponent {
    rm: Rating[] = [];

    constructor(
        private dialogRef: MatDialogRef<RatingDialogComponent>,
        public gameData: GameDataService
    ) {
        for (let _ = 0; _ < 30; _++) {
            this.rm.push({
              average: Math.random() * 5,
              count: Math.floor(Math.random() * 100 + 50),
              mine: null
            });
          }
    }

    submit(): void {
        this.dialogRef.close();
    }
}