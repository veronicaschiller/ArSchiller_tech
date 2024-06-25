import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { LoginComponent } from "../login/login.component";
import { environment } from "../envitonments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SingupComponent } from "../singup/singup.component";
import { LoginModule } from "../login/login.module";


@NgModule({
    declarations: [
        AppComponent,
        SingupComponent,
        LoginComponent
    ],
    imports:[
        BrowserModule,
        FormsModule,
        LoginModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    providers:[   
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
    ],
    bootstrap:[AppComponent]
})

export class AppModule {}