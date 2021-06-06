import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshotExists } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '@tbs/user';
import { from, Observable, throwError } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import fb from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class SharedGlobsService {
  constructor(private store: Store, private firestore: AngularFirestore, private router: Router) {}

  shareGlob(pattern: string, testData: string, expireTime = null) {
    return this.saveNewGlob(pattern, testData).pipe(
      switchMap((glob) => this.getLinkForSavedGlob(glob, expireTime))
    );
  }

  saveNewGlob(pattern: string, testData: string) {
    return this.store.select(UserState.selectCurrentUser).pipe(
      map((user) => ({ user, collection: user ? user.uid : 'anonymous' })),
      switchMap(({ collection }) =>
        from(
          this.firestore
            .collection('shared-tests')
            .doc('data')
            .collection<SharedGlob>(`${collection}`)
            .add({
              pattern,
              testData,
            })
            .then((x) => x.get())
        )
      )
    );
  }

  getLinkForSavedGlob(
    sharedGlob: fb.firestore.DocumentSnapshot<SharedGlob>,
    expireTime: Date
  ): Observable<string> {
    return this.store.select(UserState.selectCurrentUser).pipe(
      switchMap((user) =>
        from(
          this.firestore
            .collection<SharedGlobLink>(`shared-tests/data/links`)
            .add({
              expireTime,
              globId: sharedGlob.id,
              uid: user?.uid ?? null,
            })
            .then((x) => `${window.location.origin}/view/${x.id}`)
        )
      )
    );
  }

  retrieveGlobInfoFromLinkId(id: string) {
    return this.firestore
      .collection(`shared-tests/data/links`)
      .doc<SharedGlobLink>(id)
      .get()
      .pipe(
        map((x) => {
          const data = x.data();
          return {
            user: data.uid ?? 'anonymous',
            glob: data.globId,
          };
        }),
        switchMap((x) =>
          this.firestore
            .doc<SharedGlob>(`shared-tests/data/${x.user}/${x.glob}`)
            .get()
            .pipe(map((x) => x.data()))
        )
      );
  }
}

export interface SharedGlob {
  pattern: string;
  testData: string;
}

export interface SharedGlobLink {
  uid?: string;
  globId: string;
  expireTime: Date;
}
