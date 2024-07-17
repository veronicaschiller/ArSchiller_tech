import { Component } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';
import { Client } from '../model/client.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})

export class SingupComponent {
  client: Client = {
      uid: uuidv4(),
      name: "",
      email: "",
      password: "",
      emailVerified: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      deletedAt: null,
  }

  constructor (private firestore:Firestore) {}

  create(){
    const singupcollection = collection(this.firestore, 'clients')
  addDoc(singupcollection, this.client)
  .then(() => {
    console.log(this.client.name);
      this.client 
  }).catch((err) => {
    console.log(err);
  })

}
    

}
