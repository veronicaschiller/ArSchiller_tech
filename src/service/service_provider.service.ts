import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ServiceProvider } from '../model/service_provider.model';

@Injectable({
  providedIn: 'root'
})

export class ServiceProviderService {
  async signUp(data: ServiceProvider): Promise<ServiceProvider> {
    const serviceProvider  = new ServiceProvider (
      data.name,
      data.email,
      data.password,
      data.services,
    )
    
    return serviceProvider
    }
}