import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
//import { getAuth, User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
