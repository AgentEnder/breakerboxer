import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Rating } from '@tbs/rating';

@Component({
    selector: 'emu-compat-rating-dialog',
    templateUrl: './rating-dialog.component.html'
})
export class RatingDialogComponent {
    rm: Rating[] = [];

    constructor(private dialogRef: MatDialogRef<RatingDialogComponent>) {
        for (let _ = 0; _ < 30; _++) {
            this.rm.push({
              average: Math.random() * 5,
              count: Math.floor(Math.random() * 100 + 50),
              mine: null
            });
          }
    }

    submit() {
        this.dialogRef.close();
    }
}