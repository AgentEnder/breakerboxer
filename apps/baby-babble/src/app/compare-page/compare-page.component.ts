import { Clipboard } from '@angular/cdk/clipboard';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BehaviorSubject, combineLatest, EMPTY, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { BaseComponent } from '@tbs/shared';
import { UserState } from '@tbs/user';

import { Choice, ChoiceRecord } from '../firestore-models';
import { BabyBabbleNamesActions, BabyBabbleNamesState } from '../state';
import { BabyBabbleNamesService } from '../state/names.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.scss'],
})
export class ComparePageComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('card', { read: ElementRef }) card: ElementRef<HTMLElement>;

  dataSource$: Observable<MatTableDataSource<Choice>> = EMPTY;

  shareToken: Subject<string> = new ReplaySubject<string>();

  @ViewChild(MatSort) sort;

  constructor(
    private renderer: Renderer2,
    private store: Store,
    private service: BabyBabbleNamesService,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard,
    private route: ActivatedRoute
  ) {
    super();

    route.paramMap
      .pipe(
        tap((x) => console.log(x)),
        map((x) => x.get('id')),
        filter((x) => !!x),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => {
        this.shareToken.next(x);
      });

    store
      .select(UserState.selectLoggedIn)
      .pipe(
        filter((x) => !!x),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        store.dispatch(BabyBabbleNamesActions.loadLikedNames());
      });
  }

  ngAfterViewInit(): void {
    this.dataSource$ = combineLatest([
      this.store.select(BabyBabbleNamesState.selectLikes).pipe(startWith([])),
      this.shareToken.pipe(switchMap((x) => this.service.getLikedNamesFromShareToken(x))),
    ]).pipe(
      map((x) => {
        if (x[1]) {
          const combined: Record<string, number> = {};
          for (const likedName of x.flat()) {
            combined[likedName.name] ??= 0;
            combined[likedName.name] += likedName.strength;
          }
          const ds = new MatTableDataSource<Choice>(
            Object.entries(combined).map(([name, strength]) => ({ name, strength }))
          );
          ds.sort = this.sort;
          console.log(ds);
          return ds;
        } else {
          console.error('Invalid share token');
        }
      })
    );
  }

  loadNamesFromShareToken(token: string): void {
    this.shareToken.next(token);
  }

  createShareToken(): void {
    this.service
      .createShareToken()
      .pipe(
        switchMap((x) =>
          this.snackbar
            .open(`Share Token Created:  ${x}`, 'Copy')
            .afterDismissed()
            .pipe(map((y) => ({ token: x, dismissEvent: y })))
        ),
        take(1)
      )
      .subscribe((x) => {
        if (x.dismissEvent.dismissedByAction) {
          this.clipboard.copy(x.token);
        }
      });
  }
}
