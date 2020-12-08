import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import fb from 'firebase/app';
import { DateTime } from 'luxon';
import { from, Observable, ObservableInput, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  loggedIn$: Observable<boolean>;
  token$: Observable<string>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: any): ObservableInput<User> => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    this.loggedIn$ = this.user$.pipe(
      switchMap((user: User) => {
        return of(user !== null);
      })
    );

    this.token$ = this.afAuth.authState.pipe(
      switchMap(x => from(x.getIdToken()))
    );

  }

  async googleSignIn(): Promise<void> {
    const provider = new fb.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: fb.User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      lastSignIn: DateTime.utc().toISO(),
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    };

    return userRef.set(data, {merge: true});
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
