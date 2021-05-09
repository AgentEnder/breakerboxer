import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChoiceRecord } from '../firestore-models';

@Injectable({
  providedIn: 'root',
})
export class BabyBabbleNamesService {
  constructor(private store: Store, private fs: AngularFirestore) {}

  loadLikedNames(userId: string): Observable<string[]> {
    return this.fs
      .collection<ChoiceRecord>(`users/${userId}/likes`)
      .get()
      .pipe(map((x) => x.docs.map((y) => y.data().name)));
  }

  loadDislikedNames(userId: string) {
    return this.fs
      .collection<ChoiceRecord>(`users/${userId}/dislikes`)
      .get()
      .pipe(map((x) => x.docs.map((y) => y.data().name)));
  }

  likeName(userId: string, name: string): Observable<DocumentReference<ChoiceRecord>> {
    const promise = this.fs.collection<ChoiceRecord>(`users/${userId}/likes`).add({
      name,
      updatedDate: new Date(),
    });
    return from(promise);
  }

  dislikeName(userId: string, name: string): Observable<DocumentReference<ChoiceRecord>> {
    const promise = this.fs.collection<ChoiceRecord>(`users/${userId}/dislikes`).add({
      name,
      updatedDate: new Date(),
    });
    return from(promise);
  }
}
