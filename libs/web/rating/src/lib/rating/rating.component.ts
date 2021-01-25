import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { RatingBaseComponent } from '@tbs/rating';

export const WEB_RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingComponent),
  multi: true
};

@Component({
  selector: 'tbs-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [WEB_RATING_VALUE_ACCESSOR]
})
export class RatingComponent extends RatingBaseComponent implements OnInit {

  @Input() align: 'left' | 'right' = 'left';

  constructor() { super(); }

  ngOnInit(): void {
  }

}
