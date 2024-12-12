import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { AppUser } from '../../models/appUser';
//import { getAuth, User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  appUser!: AppUser | null;
  constructor(private authService: AuthService) {
    authService.appUser$.subscribe((appUser) => (this.appUser = appUser));
  }

  logout() {
    this.authService.logout();
  }
}
