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
import { Router } from '@angular/router';

@Component({
  selector: 'app-registertask',
  templateUrl: './registertask.component.html',
  styleUrl: './registertask.component.css'
})

export class RegistertaskComponent {
  stateSelected: any = ''
  activeIndexService: Set<number> = new Set()
  activeIndexPriority: number | null = null

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

  constructor(
    private firestore: Firestore,
  ) {}

  task: ServiceRequest = {
    uid: uuidv4(),
    title: '',
    description: '',
    tagService: [],
    priority: '',
    city: '',
    state: '',
    clientId: String(sessionStorage.getItem('userId')),
    isActived: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    deletedAt: null,
  };

  toggleSelectionService(value: string, index: number): void {
    if (this.activeIndexService.has(index)) {
      this.activeIndexService.delete(index);
    } else {
      this.activeIndexService.add(index);
    }
    if(this.task.tagService.includes(value)) {
      this.task.tagService.splice(this.task.tagService.indexOf(value), 1)
    } else {
      this.task.tagService.push(value)
    }
      console.log(this.task.tagService)
  }

  isActive(index: number):boolean {
    return this.activeIndexService.has(index)
  }

  toggleSelectionPriority(value: string, index: number): void {
    this.activeIndexPriority = this.activeIndexPriority === index ? null : index;
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
    if(this.task.title === '' || this.task.description === '' || this.task.tagService.length === 0 || this.task.priority === '' || this.task.city === '' || this.task.state === '') {
      console.log(this.task)
      return alert("Você precisa preencher todos os dados")
    }
    const singupcollection = collection(this.firestore, 'tasks');
    addDoc(singupcollection, this.task)
      .then(() => {
        console.log(this.task);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
