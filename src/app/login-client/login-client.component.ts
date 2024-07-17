import { Component } from '@angular/core';
import { AuthService } from '../../service/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrl: './login-client.component.css'
})
export class LoginClientComponent {
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
          this.router.navigate(['/homeClient']); // Redirecionar para a página do dashboard após o login
        })
        .catch((error) => {
          this.dataLogin.errorMessage = error.message;
        });
    }
  }
  


