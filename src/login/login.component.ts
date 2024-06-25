import { Component } from '@angular/core';
import { AuthService } from '../service/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  dataLogin: any = {
    email: '',
    password: '',
    errorMessage: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router      
  ) {}

  login() {
    this.authService
      .login(this.dataLogin.email, this.dataLogin.password)
      .then(() => {
        this.router.navigate(['/dashboard']); // Redirecionar para a página do dashboard após o login
      })
      .catch((error) => {
        this.dataLogin.errorMessage = error.message;
      });
  }
}
