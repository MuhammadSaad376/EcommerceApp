import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import { AppUser } from '../models/appUser';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
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
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
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
  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return this.userService.get(user.uid).valueChanges();
      })
    );
  }
}
