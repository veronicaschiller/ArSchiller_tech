import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { LoginComponent } from "../login/login.component";
import { environment } from "../envitonments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SingupComponent } from "../singup/singup.component";
import { LoginModule } from "../login/login.module";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { HomeComponent } from "../home/home.component";
import { HomeClientComponent } from "../home-client/home-client.component";
import { LoginClientComponent } from "./login-client/login-client.component";
import { SingupProviderComponent } from "../singup_provider/singup-provider.component";
import { CommonModule } from "@angular/common";
import { RegistertaskComponent } from "../registertask/registertask.component";
import { AuthorizationService } from "../service/authorization.service";
import { LucideAngularModule, Flame, MapPin, ClipboardPen, CircleDollarSign, MoveRight, CircleArrowLeft, Plus, ArrowLeft} from 'lucide-angular';
import { TaskQuotesComponent } from "./task-quotes/task-quotes.component";
import { HomeProviderComponent } from "../home-provider/home-provider.component";
import { OpenTaskProvidersComponent } from "../open-task-providers/open-task-providers.component";
import { TaskQuotesProviderComponent } from "./task-quotes-provider/task-quotes-provider.component";
import { AceptQuotesProviderComponent } from "../acept-quotes-provider/acept-quotes-provider.component";
import { FinishQuotesProviderComponent } from "../finish-quotes-provider/finish-quotes-provider.component";
import { CompletedTaskClientComponent } from '../completed-task-client/completed-task-client.component';
import { FinishTaskClientComponent } from '../finish-task-client/finish-task-client.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SingupComponent,
        SingupProviderComponent,
        HomeComponent,
        HomeClientComponent,
        LoginClientComponent,
        RegistertaskComponent,
        TaskQuotesComponent,
        HomeProviderComponent,
        OpenTaskProvidersComponent,
        TaskQuotesProviderComponent,
        AceptQuotesProviderComponent,
        FinishQuotesProviderComponent,
        CompletedTaskClientComponent,
        FinishTaskClientComponent,
    ],
    imports:[
        BrowserModule,
        CommonModule,
        FormsModule,
        LoginModule,
        ReactiveFormsModule,
        AppRoutingModule,
        LucideAngularModule.pick({Flame, MapPin, ClipboardPen, CircleDollarSign, MoveRight, CircleArrowLeft, Plus, ArrowLeft})
        
    ],
    providers:[   
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        AuthorizationService,
    ],
    bootstrap:[AppComponent]
})

export class AppModule {}