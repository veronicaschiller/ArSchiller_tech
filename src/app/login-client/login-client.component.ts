import { Component } from '@angular/core';
import { AuthService } from '../../service/Auth.service';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { AuthorizationService } from '../../service/authorization.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrl: './login-client.component.css',
})
export class LoginClientComponent {
  stateTemplate: String[] = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI',
    'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 
    'SE', 'SP', 'TO' 
]
    dataLogin: any = {
      email: '',
      password: '',
      errorMessage: ''
    }
  
    constructor(
      private authService: AuthService,
      private router: Router,
      private authorizationService: AuthorizationService
    ) {}
  
    login() {
      this.authService
        .login(this.dataLogin.email, this.dataLogin.password)
        .then((UserCredential) => {
          if(this.authorizationService.obterLoginStatusClient()){
            this.authorizationService.deslogarClient()
          } else {
            this.authorizationService.autorizarClient()
          }
          sessionStorage.setItem('userEmail', String(UserCredential.user?.email))
          this.router.navigate(['/homeClient']); // Redirecionar para a página do dashboard após o login
        })
        .catch((error) => {
          this.dataLogin.errorMessage = error.message;
        });
    }
  }
  


