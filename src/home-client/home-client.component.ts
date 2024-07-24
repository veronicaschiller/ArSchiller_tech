import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../model/client.model';
import { ServiceRequest } from '../model/service_request.model';
import { ServiceReuqestService } from '../service/service_request.service';
import { AuthService } from '../service/Auth.service';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css',
})

export class HomeClientComponent implements OnInit {
  user: Client | null = null

  serviceRequests: ServiceRequest[] | null = null

  constructor(
    private router: Router,
    private serviceRequestservice: ServiceReuqestService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
      const userString = sessionStorage.getItem('user')
      if(userString) {
        this.user = JSON.parse(userString)
      }
      if(this.user) {
        this.serviceRequests = await this.serviceRequestservice.getServiceRequestByClientId(this.user.uid)
      }
  }

  toggleDeleteTask(uid: string) {
    this.serviceRequestservice.deleteServiceRequestById(uid)
    this.ngOnInit()
  }

  seeQuotes(uid: string) {
    this.router.navigate([`/quotes/${uid}`])
  }

  toogleLogout() {
    this.authService.logout()
  }
}
