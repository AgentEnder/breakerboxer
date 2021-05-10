import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatRipple, RippleRef } from '@angular/material/core';

import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { BabyBabbleNamesActions } from '../state';
import { boyNames, girlNames } from './names';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss'],
})
export class VotePageComponent implements OnInit {
  displayName: string;
  allowBoyNames = true;
  allowGirlNames = true;
  isBoyName: boolean;

  @ViewChild('card', { read: ElementRef }) card: ElementRef<HTMLElement>;
  @ViewChild('likeBtn', { read: MatButton }) likeBtn: MatButton;
  @ViewChild('dislikeBtn', { read: MatButton }) dislikeBtn: MatButton;

  private swipeRipple: RippleRef;
  private activeRipple: 'left' | 'right' | null;

  constructor(private renderer: Renderer2, private store: Store) {}

  ngOnInit(): void {
    this.getNextName();
  }

  getNextName(): void {
    if (this.allowBoyNames && this.allowGirlNames) {
      this.isBoyName = !!Math.round(Math.random());
    } else if (this.allowBoyNames) {
      this.isBoyName = true;
    }
    this.displayName = randomFromArray(this.isBoyName ? boyNames : girlNames);
  }

  toggle(gender: 'boy' | 'girl') {
    if (gender === 'boy' && this.allowBoyNames) {
      this.allowBoyNames = false;
      if (!this.allowGirlNames) {
        this.allowGirlNames = true;
      }
    } else if (gender === 'boy') {
      this.allowBoyNames = true;
    }

    if (gender === 'girl' && this.allowGirlNames) {
      this.allowGirlNames = false;
      if (!this.allowBoyNames) {
        this.allowBoyNames = true;
      }
    } else if (gender === 'girl') {
      this.allowGirlNames = true;
    }
  }

  dragStart(event: MouseEvent) {
    const startX = event.clientX;
    const startY = event.clientY;
    let currentX = null;
    let currentY = null;
    fromEvent(document.body, 'mousemove')
      .pipe(takeUntil(fromEvent(document.body, 'mouseup')))
      .subscribe({
        next: (ev: MouseEvent) => {
          currentX = ev.clientX;
          currentY = ev.clientY;
          this.renderSwipePreview(startX, startY, currentX, currentY);
        },
        complete: () => {
          if (currentX && currentY) {
            this.completeSwipe(startX, startY, currentX, currentY);
          }
        },
      });
  }

  swipeStart(event: TouchEvent) {
    if (event.touches.length !== 1) {
      return;
    }

    const startX = event.touches[0].clientX;
    const startY = event.touches[0].clientY;
    let currentX = null;
    let currentY = null;
    fromEvent(document.body, 'touchmove')
      .pipe(takeUntil(fromEvent(document.body, 'touchend')))
      .subscribe({
        next: (ev: TouchEvent) => {
          currentX = ev.touches[0].clientX;
          currentY = ev.touches[0].clientY;
          this.renderSwipePreview(startX, startY, currentX, currentY);
        },
        complete: () => {
          if (currentX && currentY) {
            this.completeSwipe(startX, startY, currentX, currentY);
          }
        },
      });
  }

  renderSwipePreview(startX: number, startY: number, currentX: number, currentY: number) {
    const deltaX = startX - currentX; // (+) = swipe left, (-) = swipe right.
    const deltaY = (startY - currentY) / 4;
    const magnitude = deltaX * deltaX + deltaY * deltaY;
    let angle = 0;
    if (magnitude > 256) {
      angle = -(deltaX * 90) / this.card.nativeElement.clientWidth;
    }

    if (deltaX > 0 && this.activeRipple !== 'left') {
      this.swipeRipple?.fadeOut();
      this.swipeRipple = this.dislikeBtn.ripple.launch({ persistent: true, centered: true });
      this.activeRipple = 'left';
    } else if (this.activeRipple !== 'right' && deltaX < 0) {
      this.swipeRipple?.fadeOut();
      this.swipeRipple = this.likeBtn.ripple.launch({ persistent: true, centered: true });
      this.activeRipple = 'right';
    }
    this.renderer.setStyle(this.card.nativeElement, 'transform', `rotate(${angle}deg)`);
  }

  completeSwipe(startX: number, startY: number, currentX: number, currentY: number) {
    this.renderer.setStyle(this.card.nativeElement, 'transform', '');
    const deltaX = startX - currentX; // (+) = swipe left, (-) = swipe right.
    const deltaY = (startY - currentY) / 4;
    const magnitude = deltaX * deltaX + deltaY * deltaY;
    if (magnitude > 256) {
      if (deltaX > 0) {
        this.dislike();
      } else {
        this.like();
      }
    }
    this.swipeRipple?.fadeOut();
    this.activeRipple = null;
  }

  like() {
    this.store.dispatch(BabyBabbleNamesActions.likeName({ name: this.displayName }));
    this.getNextName();
  }

  dislike() {
    this.store.dispatch(BabyBabbleNamesActions.dislikeName({ name: this.displayName }));
    this.getNextName();
  }
}

function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
