import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Choice, ChoiceRecord } from '../firestore-models';

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
}
