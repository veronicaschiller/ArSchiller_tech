import { Component } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { ServiceProvider } from '../model/service_provider.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup-provider',
  templateUrl: './singup-provider.component.html',
  styleUrls: ['./singup-provider.component.css'],
})
export class SingupProviderComponent {
  servicesTemplate: String[] = [
    'Carpinteiro', 'Eletricista', 'Pintor', 'Pedreiro', 'Mecânico','Encanador', 'Jardineiro', 'Marceneiro', 'Serralheiro', 'Vidraceiro', 'Técnico de Refrigeração', 'Técnico de informática'
  ]

  serviceProvider: ServiceProvider = {
    uid: uuidv4(),
    name: '',
    email: '',
    password: '',
    emailVerified: false,
    services: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    deletedAt: null,
  };

  constructor(
    private firestore: Firestore,
    private router: Router,
  ) {}

  toggleSelection(value: string): void {
    if(this.serviceProvider.services.includes(value)) {
      this.serviceProvider.services.splice(this.serviceProvider.services.indexOf(value), 1)
    } else {
      this.serviceProvider.services.push(value)
    }
      console.log(this.serviceProvider.services)
  }

  create() {
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      this.serviceProvider.email,
      this.serviceProvider.password
    );
    const singupcollection = collection(this.firestore, 'service_providers');
    addDoc(singupcollection, this.serviceProvider)
      .then(() => {
        console.log(this.serviceProvider.name);
        this.router.navigate(['/homeprovider'])
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
