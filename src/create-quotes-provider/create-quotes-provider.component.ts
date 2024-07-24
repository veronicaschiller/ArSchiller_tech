import { Component } from '@angular/core';
import { ServiceProvider } from '../model/service_provider.model';
import { Quote } from '../model/quote.model';
import { ServiceRequest } from '../model/service_request.model';
import { Router } from '@angular/router';
import { QuoteService } from '../service/quote.service';
import { ServiceReuqestService } from '../service/service_request.service';
import { Timestamp } from 'firebase/firestore';

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
  selector: 'app-create-quotes-provider',
  templateUrl: './create-quotes-provider.component.html',
  styleUrl: './create-quotes-provider.component.css',
})
export class CreateQuotesProviderComponent {
  provider: ServiceProvider | null = null;
  quotesService: Quote[] | null = null;
  quotesIt: QuoteIt[] | null = null;
  quoteIt: QuoteIt[] | null = null;
  serviceRequests: ServiceRequest[] | null = null;

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
    this.router.navigate([`/quotes/${uid}`]);
  }
}
