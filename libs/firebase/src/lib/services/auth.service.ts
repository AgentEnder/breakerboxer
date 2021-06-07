import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import fb from 'firebase/app';
import { DateTime } from 'luxon';
import { from, Observable } from 'rxjs';

import { IAuthService, User, UserActions, UserState } from '@tbs/user';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private store: Store
  ) {
    afAuth.setPersistence('local');
    afAuth.authState
      .pipe(
        take(1),
        switchMap((x) => from(this.updateUserData(x)))
      )
      .subscribe((x) => {
        store.dispatch(UserActions.logInSuccess({ user: x }));
      });
  }

  signIn$(): Observable<User> {
    return this.googleSignIn$();
  }

  async googleSignIn(): Promise<User> {
    const provider = new fb.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  googleSignIn$ = () => from(this.googleSignIn());

  async updateUserData(user: fb.User): Promise<User> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      lastSignIn: DateTime.utc().toISO(),
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };

    await userRef.set(data, { merge: true });
    return data;
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  signOut$ = () => from(this.signOut());
}
