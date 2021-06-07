import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { EMPTY, fromEvent, Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { BabyBabbleNamesActions, BabyBabbleNamesState } from '../state';
import { UserState } from '@tbs/user';
import { BaseComponent } from '@tbs/shared';
import { MatTableDataSource } from '@angular/material/table';
import { Choice } from '../firestore-models';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('card', { read: ElementRef }) card: ElementRef<HTMLElement>;

  dataSource$: Observable<MatTableDataSource<Choice>> = EMPTY;

  @ViewChild(MatSort) sort;

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
  }
  ngAfterViewInit(): void {
    this.dataSource$ = this.store.select(BabyBabbleNamesState.selectLikes).pipe(
      map((x) => {
        const ds = new MatTableDataSource<Choice>(x);
        ds.sort = this.sort;
        console.log(ds);
        return ds;
      }),
      takeUntil(this.destroy$)
    );
  }
}
