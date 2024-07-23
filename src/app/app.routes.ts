import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SingupComponent } from '../singup/singup.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { HomeClientComponent } from '../home-client/home-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { SingupProviderComponent } from '../singup_provider/singup-provider.component';
import { RegistertaskComponent } from '../registertask/registertask.component';
import { authorizationGuardClient,  authorizationGuardProvider} from './guard/authorization.guard';
import { TaskQuotesComponent } from './task-quotes/task-quotes.component';
import { HomeProviderComponent } from '../home-provider/home-provider.component';
import { OpenTaskProvidersComponent } from '../open-task-providers/open-task-providers.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registerTask', component: RegistertaskComponent, canActivate: [authorizationGuardClient]},
  { path: 'homeClient', component: HomeClientComponent, canActivate: [authorizationGuardClient]},
  { path: 'home', component: HomeComponent },
  { path: 'singup', component: SingupComponent },
  {path:'singup-provider', component: SingupProviderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginClient', component: LoginClientComponent },
  { path: 'quotes/:taskId', component: TaskQuotesComponent, canActivate:[authorizationGuardProvider, authorizationGuardProvider] },
  {path:'homeprovider', component:HomeProviderComponent, canActivate:[authorizationGuardProvider]},
  {path:'providerOpenTask', component:OpenTaskProvidersComponent, canActivate:[authorizationGuardProvider]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
