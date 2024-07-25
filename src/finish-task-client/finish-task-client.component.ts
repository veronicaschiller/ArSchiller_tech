import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../model/client.model';
import { ServiceRequest } from '../model/service_request.model';
import { ServiceReuqestService } from '../service/service_request.service';
import { QuoteService } from '../service/quote.service';


@Component({
  selector: 'app-finish-task-client',
  templateUrl: './finish-task-client.component.html',
  styleUrl: './finish-task-client.component.css',
})
export class FinishTaskClientComponent {
  user: Client | null = null;

  serviceRequests: ServiceRequest[] | null = null;

  constructor(
    private router: Router,
    private serviceRequestservice: ServiceReuqestService,
    private quoteService: QuoteService
  ) {}

  async ngOnInit() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
    if (this.user) {
      this.serviceRequests =
        await this.serviceRequestservice.getFinishServiceRequestByClientId(this.user.uid);
    }
  }

  toggleDeleteTask(uid: string) {
    this.serviceRequestservice.deleteServiceRequestById(uid);
    this.ngOnInit();
  }

  seeQuotes(uid: string) {
    this.router.navigate([`/quotes/${uid}`]);
  }
  toogleLogout() {
  
  }

  async toggleCompletedTask(uid: string) {
    await this.serviceRequestservice.updateCompletedServiceRequestById(uid)
    if(this.user) {
      const task = await this.serviceRequestservice.getServiceRequestById(uid)
      await this.quoteService.updateQuoteFinishByServiceRequestIdAndServiceProviderId(uid, task.serviceProviderId)
    }
  }
}
