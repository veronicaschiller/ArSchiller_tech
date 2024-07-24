import { Component } from '@angular/core';
import { ServiceRequest } from '../model/service_request.model';
import { ServiceProvider } from '../model/service_provider.model';
import { QuoteService } from '../service/quote.service';
import { ServiceReuqestService } from '../service/service_request.service';
import { Timestamp } from 'firebase/firestore';
import { Quote } from '../model/quote.model';
import { Router } from '@angular/router';

interface QuoteIt {
  uid: string;
  price: number;
  serviceProviderId: string;
  serviceRequestId: string;
  status: 'accepted' | 'refused' | '';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp | null;
  serviceRequest: ServiceRequest;
}
@Component({
  selector: 'app-open-task-providers',
  templateUrl: './open-task-providers.component.html',
  styleUrl: './open-task-providers.component.css',
})
export class OpenTaskProvidersComponent {
  provider: ServiceProvider | null = null;
  quotesService: Quote[] | null = null;
  quotesIt: QuoteIt[] | null = null;
  quoteIt: QuoteIt[] | null = null;
  serviceRequests: ServiceRequest[] | null = null;
  switchContent:{[key: string]: boolean} = {}
  price: number = 0;

  constructor(
    private router: Router,
    private serviceQuotes: QuoteService,
    private serviceRequestService: ServiceReuqestService
  ) {}

  async ngOnInit() {
    const providerString = sessionStorage.getItem('user');
    if (providerString) {
      this.provider = JSON.parse(providerString);
    }
    if (this.provider) {
      this.serviceRequests =
        await this.serviceRequestService.getServiceRequestByServiceProviderServices(
          this.provider.services
        );
    }
  }

  async toggleDeleteQuote(uid: string) {
    await this.serviceQuotes.deleteQuotesById(uid);
    this.ngOnInit();
  }

  formatedPrice(price: number): String {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  seeQuotes(uid: string) {
    this.router.navigate([`/quotes/provider/${uid}`]);
  }

  toogleDiv(uid: string) {
    this.switchContent[uid] = !this.switchContent[uid];
  }

  async createQuote(serviceId: string) {
    if (serviceId) {
      if (this.provider) {
        const quote = new Quote(
          this.price,
          this.provider.uid,
          serviceId,
          ''
        );
        await this.serviceQuotes.createQuote(quote)
      }
    }
    this.switchContent[serviceId] = !this.switchContent[serviceId];
    this.ngOnInit()
  }
}
