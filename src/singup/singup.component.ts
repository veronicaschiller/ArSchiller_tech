import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Client } from '../model/client.model';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
client: Client ={
  uid:"",
    name: "",
    email: '',
    password: " ",
    emailVerified: false ,
    createdAt: "",
    updatedAt: '',
    deletedAt: "string" || null


}

  constructor (private firestore:Firestore ) {}

  create(){
    const singupcollection = collection(this.firestore, 'client')
  addDoc(singupcollection, this.client)
  .then(() => {
    console.log(this.client.name+ 'cadastrado com sucesso, vá ate a tela de login');
      this.client 
  }).catch((err) => {
    console.log(err);
  })

}
    

}
