import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  // ngOnInit() {
  //   // Handle redirect result when returning from the Google sign-in page
  //   this.afAuth
  //     .getRedirectResult()
  //     .then((result) => {
  //       if (result) {
  //         console.log('User successfully signed in:', result);
  //       } else {
  //         console.log('No user signed in after redirect.');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error during redirect sign-in:', error);
  //     });
  // }
  login() {
    this.authService.login();
  }
}
