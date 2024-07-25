import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../model/client.model';
import { ServiceRequest } from '../model/service_request.model';
import { ServiceReuqestService } from '../service/service_request.service';


@Component({
  selector: 'app-completed-task-client',
  templateUrl: './completed-task-client.component.html',
  styleUrl: './completed-task-client.component.css'
})
export class CompletedTaskClientComponent {
  user: Client | null = null;

  serviceRequests: ServiceRequest[] | null = null;

  constructor(
    private router: Router,
    private serviceRequestservice: ServiceReuqestService
  ) {}

  async ngOnInit() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
    if (this.user) {
      this.serviceRequests =
        await this.serviceRequestservice.getCompletedServiceRequestByClientId(this.user.uid);
    }
  }

  toogleLogout() {

  }
}
