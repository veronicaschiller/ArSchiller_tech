import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "../envitonments/environment";
import { AngularFireAuthGuardModule } from "@angular/fire/compat/auth-guard";
import { FormsModule } from "@angular/forms";

@NgModule ({
    imports: [
      BrowserModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthGuardModule,
    ],
    providers: [],
    exports: [],
  })
  export class aceptquotesmodule{}