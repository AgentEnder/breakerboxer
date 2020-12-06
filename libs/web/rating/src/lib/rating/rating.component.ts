import { Component, Input, OnInit } from '@angular/core';

import { RatingBaseComponent } from '@tbs/rating';

@Component({
  selector: 'tbs-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent extends RatingBaseComponent implements OnInit {

  @Input() align: 'left' | 'right' = 'left';

  constructor() { super(); }

  ngOnInit(): void {
  }

}
