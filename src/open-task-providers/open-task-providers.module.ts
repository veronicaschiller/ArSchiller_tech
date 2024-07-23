import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "../envitonments/environment";
import { AngularFireAuthGuardModule } from "@angular/fire/compat/auth-guard";


@NgModule ({
    imports: [
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthGuardModule,
    ],
    providers: [],
    exports: [],
  })
  export class OpenTaskProviderModule {}