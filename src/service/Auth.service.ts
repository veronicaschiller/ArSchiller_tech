import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert("E-mail e senha incorretos")
      throw error;
    }
  }

  logout() {
    sessionStorage.clear()
    this.afAuth.signOut();
    this.router.navigate(['/home'])
  }

  getUser() {
    return this.afAuth.authState;
  }
}