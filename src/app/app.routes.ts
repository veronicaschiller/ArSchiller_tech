import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
 { path: 'login', component: LoginComponent }, // Adicione a rota para o login
 // Outras rotas da sua aplicação
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }