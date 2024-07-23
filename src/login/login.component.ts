import { Component } from '@angular/core';
import { AuthService } from '../service/Auth.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';
import { ServiceProviderService } from '../service/service_provider.service';

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
    private router: Router,
    private authorizationService: AuthorizationService,
    private providerService: ServiceProviderService
  ) { }

  login() {
    sessionStorage.clear()
    this.authService
      .login(this.dataLogin.email, this.dataLogin.password)
      .then((UserCredential) => {
        if (UserCredential.user?.email) {
          this.providerService.getProviderByEmail(UserCredential.user.email)
          this.authorizationService.checkUserType(UserCredential.user.email)
            .subscribe(userType => {
              sessionStorage.setItem('userType', userType)
              if (userType === 'provider') {
                this.router.navigate(['/homeprovider']);
              } else if (userType === 'client') {
                this.authorizationService.deslogar()
                alert('Você precisa fazer o login como cliente!')
                this.router.navigate(['/loginClient']);
              } else {
                alert('Você não está cadastrado na nossa aplicação, por favor faça seu cadastro')
                this.router.navigate(['/singup-provider']);
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
