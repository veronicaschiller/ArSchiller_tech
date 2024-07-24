import { Observable, of } from "rxjs"
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthorizationService {
    authentication = false

    constructor(
        private firestore: AngularFirestore,
    ) { }

    obterLoginStatus = () => sessionStorage.getItem('userType')

    checkUserType(email: string): Observable<string> {
        const clientRef = this.firestore.collection('clients', ref => ref.where('email', '==', email)).get();
        const providerRef = this.firestore.collection('service_providers', ref => ref.where('email', '==', email)).get();

        return clientRef.pipe(
            switchMap(clientSnapshot => {
                if (!clientSnapshot.empty) {
                    return of('client');
                } else {
                    return providerRef.pipe(
                        map(providerSnapshot => !providerSnapshot.empty ? 'provider' : '')
                    );
                }
            })
        );
    }
}