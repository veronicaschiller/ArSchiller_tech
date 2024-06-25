import { Component } from '@angular/core';
import { AuthService } from '../service/Auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private clientService: ClientService
      
  ) {}

  login() {
    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/dashboard']); // Redirecionar para a página do dashboard após o login
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  signup() {
    this.clientService
  }
}
