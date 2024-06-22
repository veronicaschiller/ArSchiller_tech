import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
 { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
 // Outras rotas da sua aplicação
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }