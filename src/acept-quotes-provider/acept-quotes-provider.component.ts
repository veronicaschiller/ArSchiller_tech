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
  status: 'accepted' | 'refused' | 'finish' | '';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp | null;
  serviceRequest: ServiceRequest;
}
@Component({
  selector: 'app-acept-quotes-provider',
  templateUrl: './acept-quotes-provider.component.html',
  styleUrl: './acept-quotes-provider.component.css'
})
export class AceptQuotesProviderComponent {
  provider: ServiceProvider | null = null;
  quotesService: Quote[] | null = [];
  quotesIt: QuoteIt[] | null = [];
  serviceRequests: ServiceRequest[] | null = [];

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
      this.quotesService = await this.serviceQuotes.getOpenQuotesByServiceProviderId(this.provider.uid);
    }
    if (this.quotesService) {
      this.quotesService.map(async (quote) => {
        const serviceRequest = await this.serviceRequestService.getServiceRequestById(quote.serviceRequestId);
          const quoteTemp: QuoteIt = ({
            uid: quote.uid,
            price: quote.price,
            serviceProviderId: quote.serviceProviderId,
            serviceRequestId: quote.serviceRequestId,
            status: quote.status,
            createdAt: quote.createdAt,
            updatedAt: quote.updatedAt,
            deletedAt: quote.deletedAt,
            serviceRequest: serviceRequest
          })
          if(quoteTemp && this.quotesIt) {
            this.quotesIt.push(quoteTemp)
          }
      });
    }
  }

  async toggleDeleteQuote(uid: string) {
    await this.serviceQuotes.deleteQuotesById(uid);
    this.ngOnInit();
  }

  formatedPrice(price: number): String {
    const real = Number(price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return real
  }

}
