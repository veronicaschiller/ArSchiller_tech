import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { SingupComponent } from "../singup/singup.component";
import { LoginComponent } from "../login/login.component";
import { AppComponent } from "./app.component";
import { environment } from "../envitonments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        AppComponent,
        SingupComponent,
        LoginComponent
    ],
    imports:[
        BrowserModule,
        FormsModule,
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