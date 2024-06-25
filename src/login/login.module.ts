import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../service/Auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [AuthService]
})
export class LoginModule {}
