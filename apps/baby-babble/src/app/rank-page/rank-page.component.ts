import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';

import { filter, map, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { BabyBabbleNamesActions, BabyBabbleNamesState } from '../state';
import { UserState } from '@tbs/user';
import { BaseComponent } from '@tbs/xplat/core';

@Component({
  selector: 'app-vote-page',
  templateUrl: './rank-page.component.html',
  styleUrls: ['./rank-page.component.scss'],
})
export class RankPageComponent extends BaseComponent {
  displayName: string;
  allowBoyNames = true;
  allowGirlNames = true;
  isBoyName: boolean;

  private nameStrengthMap: Record<string, { total: number; new: number }> = {};

  public nameChoices: string[] = [];
  public names: [string, string];

  public state: 'OUT_OF_NAMES' | 'NOT_ENOUGH_NAMES' | 'LOADING' | 'ELIMINATE';

  public favorite: string;

  constructor(private renderer: Renderer2, private store: Store) {
    super();

    store
      .select(UserState.selectLoggedIn)
      .pipe(
        filter((x) => !!x),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => {
        store.dispatch(BabyBabbleNamesActions.loadLikedNames());
      });

    store
      .select(BabyBabbleNamesState.selectLikes)
      .pipe(
        map((x) => {
          x.forEach((name) => {
            if (!(name.name in this.nameStrengthMap)) {
              this.nameStrengthMap[name.name] = {
                new: 0,
                total: name.strength ?? 0,
              };
              this.nameChoices.push(name.name);
            }
          });
        })
      )
      .subscribe((x) => this.getNextNames());
  }

  getNextNames(): void {
    if (this.nameChoices.length < 2) {
      const allChoices = Object.entries(this.nameStrengthMap);
      if (allChoices.length > 2) {
        this.nameChoices = allChoices
          .sort((a, b) => -a[1].new + b[1].new)
          .filter((val, idx, arr) => val[1].new === arr[0][1].new)
          .map((x) => x[0]);

        if (this.nameChoices.length < 2) {
          this.favorite = this.nameChoices[0];
          this.state = 'OUT_OF_NAMES';
          return;
        }
      } else {
        this.state = 'NOT_ENOUGH_NAMES';
        return;
      }
    }

    this.state = 'ELIMINATE';

    const indicies: [number, number] = [
      randomIdxFromArray(this.nameChoices),
      randomIdxFromArray(this.nameChoices),
    ];

    if (indicies[0] === indicies[1]) {
      indicies[1] = (indicies[1] + 1) % this.nameChoices.length;
    }

    this.names = indicies.map((x) => this.nameChoices[x]) as [string, string];

    this.nameChoices.splice(Math.max(...indicies), 1);
    this.nameChoices.splice(Math.min(...indicies), 1);
  }

  chooseName(name: string): void {
    const entry = this.nameStrengthMap[name];
    entry.new++;
    this.store.dispatch(
      BabyBabbleNamesActions.updateNameStrength({
        choice: {
          name: name,
          strength: ++entry.total,
        },
      })
    );

    this.getNextNames();
  }

  restart() {
    this.nameChoices = Object.entries(this.nameStrengthMap).map((x) => x[0]);
    this.getNextNames();
  }
}

function randomIdxFromArray(array): number {
  return Math.floor(Math.random() * array.length);
}
