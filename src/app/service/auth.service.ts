import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  constructor(private afAuth: AngularFireAuth) {
    // KafAuth.authState.subscribe((user) => (this.user = user)); remove extra code
    this.user$ = afAuth.authState;
  }
  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        console.log('User successfully logged out.');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  }
  login() {
    const provider = new GoogleAuthProvider();
    this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        console.log('Redirecting to Google sign-in...');
      })
      .catch((error) => {
        console.error('Error during sign-in redirect:', error);
      });
  }
}
