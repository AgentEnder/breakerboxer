import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { User, IAuthService } from '@tbs/user';

import fb from 'firebase/app';
import { DateTime } from 'luxon';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}
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
