import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Rating } from '../models/rating.interface';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class RatingBaseComponent implements ControlValueAccessor {
  private _rating: Rating;
  @Input() set rating(v: Rating) {
    this._rating = v;
    this.display = this._rating.mine !== null ? this._rating.mine : this._rating.average;
  }
  get rating(): Rating {
    return this._rating;
  }

  private _value: any;

  set value(value: number) {
    this._value = value;
    this.rating = {
      ...this.rating,
      mine: value,
    };
    this.notifyValueChange();
  }

  get value(): number {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  display: number;

  rate(val: number): void {
    if (this._rating.mine === null) {
      this._rating.count++;
    }
    this._rating.mine = val;
    this.display = val;
    this.value = val;
  }

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
