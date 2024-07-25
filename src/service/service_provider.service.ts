import { Injectable } from '@angular/core';
import { ServiceProvider } from '../model/service_provider.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { dbFirebase } from '../envitonments/environment'

@Injectable({
  providedIn: 'root'
})

export class ServiceProviderService {
  private dbPath = '/service_providers'
  providersRef: AngularFireList<any>

  constructor(private db: AngularFireDatabase) {
    this.providersRef = db.list(this.dbPath)
  }

  async signUp(data: ServiceProvider): Promise<ServiceProvider> {
    const serviceProvider  = new ServiceProvider (
      data.name,
      data.email,
      data.password,
      data.services,
    )
    
    return serviceProvider
    }

    async getProviderByEmail(email: string) {
      try {
        const providers = collection(dbFirebase, this.dbPath)
        const q = query(providers, where('email', '==', email))
  
        const querySnapShot = await getDocs(q)
  
        if (querySnapShot.empty) {
          console.log('Prestador não existe');
          return null;
        }
  
        let providerData: any;
        querySnapShot.forEach((doc) => {
         providerData = { id: doc.id, ...doc.data() };
        });
        
        sessionStorage.setItem('user', JSON.stringify(providerData))
        return String(providerData.uid);
      } catch (error) {
        console.error('Erro ao buscar prestador: ', error);
        return null;
      }
    }

    async getProviderById(uid: string) {
      try {
        const provider = collection(dbFirebase, this.dbPath)
        const q = query(provider, where('uid', '==', uid))
        
        const querySnapShot = await getDocs(q)
  
        if (querySnapShot.empty) {
          console.log('Prestador não existe');
          return null;
        }
  
        let providerData: any;
        querySnapShot.forEach((doc) => {
         providerData = ({ id: doc.id, ...doc.data() });
        });
        
        return providerData;
      } catch (error) {
        console.error('Erro ao buscar prestador: ', error);
        return null;
      }
    }
}