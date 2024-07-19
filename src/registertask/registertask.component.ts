import { Component } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { ServiceRequest } from '../model/service_request.model';
import { v4 as uuidv4 } from 'uuid';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-registertask',
  templateUrl: './registertask.component.html',
  styleUrl: './registertask.component.css'
})
export class RegistertaskComponent {
  stateSelected: any = ''
  client: any = this.clientService.getClientByEmail(String(sessionStorage.getItem('userEmail')))

  servicesTemplate: String[] = [
    'Carpinteiro', 'Eletricista', 'Pintor', 'Pedreiro', 'Mecânico','Encanador', 'Jardineiro',
    'Marceneiro', 'Serralheiro', 'Vidraceiro', 'Técnico de Refrigeração', 'Técnico de informática'
  ]

  priorityTemplate: String[] = ['Muito baixa', 'Baixa','Média', 'Alta', 'Muito Alta']

  stateTemplate: String[] = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI',
    'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 
    'SE', 'SP', 'TO' 
]

  constructor(private firestore: Firestore, private clientService: ClientService) {}

  task: ServiceRequest = {
    uid: uuidv4(),
    title: '',
    description: '',
    tagService: [],
    priority: '',
    city: '',
    state: '',
    clientId: '',
    isActived: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    deletedAt: null,
  };

  toggleSelectionService(value: string): void {
    if(this.task.tagService.includes(value)) {
      this.task.tagService.splice(this.task.tagService.indexOf(value), 1)
    } else {
      this.task.tagService.push(value)
    }
      console.log(this.task.tagService)
  }
  toggleSelectionPriority(value: string): void {
    this.task.priority = ''
    this.task.priority = value
    console.log(this.task.priority)
  }
  toggleSelectionState(value: string): void {
    this.task.state = ''
    this.task.state = value
    console.log(this.task.state)
  }

  create() {
    this.task.clientId = this.client.__zone_symbol__value.toString()
    const singupcollection = collection(this.firestore, 'tasks');
    addDoc(singupcollection, this.task)
      .then(() => {
        console.log(this.task.clientId);
        this.task;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
