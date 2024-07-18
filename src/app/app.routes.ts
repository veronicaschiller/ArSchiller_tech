import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SingupComponent } from '../singup/singup.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { HomeClientComponent } from '../home-client/home-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { SingupProviderComponent } from '../singup_provider/singup-provider.component';
import { RegistertaskComponent } from '../registertask/registertask.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registerTask', component: RegistertaskComponent },
  { path: 'homeClient', component: HomeClientComponent },
  { path: 'home', component: HomeComponent },
  { path: 'singup', component: SingupComponent },
  {path:'singup-provider', component: SingupProviderComponent},
  { path: 'login', component: LoginComponent },
  { path: 'loginClient', component: LoginClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
