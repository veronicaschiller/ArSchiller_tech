import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Client } from '../model/client.model'

@Injectable({
  providedIn: 'root'
})

export class ClientService {
 async signUp(data: Client): Promise<Client> {
  const client  = new Client (
    data.name,
    data.email,
    data.password,
    data.emailVerified,
  )
  return client
  }
}