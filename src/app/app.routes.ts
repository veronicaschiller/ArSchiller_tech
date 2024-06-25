import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SingupComponent } from '../singup/singup.component';
import { LoginComponent } from '../login/login.component';

export const routes: Routes = [
 {path:'singup', component: SingupComponent},
 {path:'login', component: LoginComponent},

];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})

export class AppRoutingModule {}