import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(
      map((appUser) => appUser?.isAdmin || false) // Check if user is admin; fallback to false
    );
  }
}
