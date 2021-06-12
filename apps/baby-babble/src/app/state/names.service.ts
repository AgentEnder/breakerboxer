import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Choice, ChoiceRecord, ExchangeToken } from '../firestore-models';
import { UserState } from '@tbs/user';

@Injectable({
  providedIn: 'root',
})
export class BabyBabbleNamesService {
  constructor(private store: Store, private fs: AngularFirestore) {}

  loadLikedNames(userId: string): Observable<Choice[]> {
    return this.fs
      .collection<ChoiceRecord>(`users/${userId}/likes`)
      .get()
      .pipe(map((x) => x.docs.map((y) => ({ ...y.data(), id: y.id }))));
  }

  loadDislikedNames(userId: string) {
    return this.fs
      .collection<ChoiceRecord>(`users/${userId}/dislikes`)
      .get()
      .pipe(map((x) => x.docs.map((y) => y.data().name)));
  }

  likeName(userId: string, name: string): Observable<ChoiceRecord> {
    const path = `users/${userId}/likes/${name}`;
    const promise = this.fs.firestore
      .doc(path)
      .get()
      .then((snapshot) => {
        let data: ChoiceRecord;
        if (snapshot.exists) {
          data = snapshot.data() as ChoiceRecord;
          data.strength++;
        } else {
          data = {
            name,
            updatedDate: new Date(),
            strength: 1,
          };
        }
        return this.fs
          .doc(path)
          .set(data)
          .then(() => data);
      });
    return from(promise);
  }

  dislikeName(userId: string, name: string): Observable<ChoiceRecord> {
    const path = `users/${userId}/dislikes/${name}`;
    const promise = this.fs.firestore
      .doc(path)
      .get()
      .then((snapshot) => {
        let data: ChoiceRecord;
        if (snapshot.exists) {
          data = snapshot.data() as ChoiceRecord;
          data.strength++;
        } else {
          data = {
            name,
            updatedDate: new Date(),
            strength: 1,
          };
        }
        return this.fs
          .doc(path)
          .set(data)
          .then(() => data);
      });
    return from(promise);
  }

  updateChoiceStrength(userId: string, name: string, strength: number) {
    const promise = this.fs.doc<ChoiceRecord>(`users/${userId}/likes/${name}`).update({ strength });
    return from(promise);
  }

  getLikedNamesFromShareToken(token: string): Observable<ChoiceRecord[] | null> {
    console.log('In Get Liked Names');
    return this.fs
      .doc<ExchangeToken>(`exchangeTokens/${token}`)
      .get()
      .pipe(
        switchMap((docRef) => {
          if (docRef.exists) {
            const exchange = docRef.data();
            if (exchange.active)
              return this.fs
                .collection<ChoiceRecord>(`users/${exchange.targetUser}/likes`)
                .get()
                .pipe(
                  map((x) => {
                    return x.docs.length ? x.docs.map((doc) => doc.data()) : null;
                  })
                );
          }
          return of(null);
        })
      );
  }

  createShareToken(): Observable<string> {
    return this.store.select(UserState.selectCurrentUser).pipe(
      switchMap((x) =>
        !x
          ? throwError(new Error('You must be logged in to create a share token!'))
          : from(
              this.fs
                .collection<ExchangeToken>(`exchangeTokens`)
                .add({
                  active: true,
                  createdOn: new Date(),
                  removedOn: null,
                  targetUser: x.uid,
                })
                .then((ref) => ref.id)
            )
      )
    );
  }
}
