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

  dataLogin: any = {
    email: '',
    password: '',
    errorMessage: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private clientService: ClientService
  ) { }

  login() {
    sessionStorage.clear()
    this.authService
      .login(this.dataLogin.email, this.dataLogin.password)
      .then((UserCredential) => {
        if (UserCredential.user?.email) {
          this.clientService.getClientByEmail(UserCredential.user.email)
          this.authorizationService.checkUserType(UserCredential.user.email)
            .subscribe(userType => {
              sessionStorage.setItem('userType', userType)
              if (userType === 'client') {
                sessionStorage.setItem('userEmail', String(UserCredential.user?.email))
                this.router.navigate(['/homeClient']);
              }
              else if (userType === 'provider') {
                this.authorizationService.deslogar()
                alert('Você precisa fazer o login como prestador de serviço!')
                this.router.navigate(['/login']);
              } else {
                alert('Você não está cadastrado na nossa aplicação, por favor faça seu cadastro')
                this.router.navigate(['/singup']);
              }
            })
        }
      })
      .catch((error) => {
        this.dataLogin.errorMessage = error.message;
      });
  }

  logout() {
    this.authService.logout().then(() => {
      sessionStorage.clear();
      this.router.navigate(['/home']);
    });
  }
}



