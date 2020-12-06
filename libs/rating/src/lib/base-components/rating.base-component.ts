import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rating } from '../models/rating.interface';

@Component({ template: '' })
export class RatingBaseComponent {
  private _rating: Rating;
  @Input() set rating(v: Rating) {
    this._rating = v;
    this.display = this._rating.mine !== null ? this._rating.mine : this._rating.average;
  }
  get rating(): Rating {
    return this._rating;
  }

  display: number;

  @Output() ratingSelected = new EventEmitter<number>();

  rate(val: number): void {
    if (this._rating.mine === null) {
      this._rating.count++;
    }
    this._rating.mine = val;
    this.display = val;
    this.ratingSelected.emit(val);
  }
}
