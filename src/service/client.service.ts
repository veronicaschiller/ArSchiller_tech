import { Injectable } from '@angular/core';
import { Client } from '../model/client.model'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { dbFirebase } from '../envitonments/environment'

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private dbPath = '/clients'
  clientsRef: AngularFireList<any>

  constructor(private db: AngularFireDatabase) {
    this.clientsRef = this.db.list(this.dbPath)
  }

  async signUp(data: Client): Promise<Client> {
    const client = new Client(
      data.name,
      data.email,
      data.password,
    )

    return client
  }

  async getClientByEmail(email: string) {
    try {
      const clients = collection(dbFirebase, this.dbPath)
      const q = query(clients, where('email', '==', email))

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        console.log('Cliente não existe');
        return null;
      }

      let clientData: any;
      querySnapShot.forEach((doc) => {
       clientData = { id: doc.id, ...doc.data() };
      });

      sessionStorage.setItem('user', JSON.stringify(clientData))
      return String(clientData.uid);
    } catch (error) {
      console.error('Erro ao buscar cliente: ', error);
      return null;
    }
  }
}