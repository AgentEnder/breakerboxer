import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { RatingComponent } from './rating/rating.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [RatingComponent],
  exports: [RatingComponent],
})
export class RatingModule {}
