import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from '../model/service_provider.model';
import { QuoteService } from '../service/quote.service';
import { Quote } from '../model/quote.model';
import { ServiceRequest } from '../model/service_request.model';
import { ServiceReuqestService } from '../service/service_request.service';
import { Timestamp } from 'firebase/firestore';

interface QuoteIt {
  uid: string;
  price: number;
  serviceProviderId: string;
  serviceRequestId: string;
  status: 'accepted' | 'refused' | ''
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt?: Timestamp | null
  serviceRequest: ServiceRequest
}

@Component({
  selector: 'app-home-provider',
  templateUrl: './home-provider.component.html',
  styleUrl: './home-provider.component.css',
})

export class HomeProviderComponent implements OnInit {
  provider: ServiceProvider | null = null;
  quotesService: Quote[] | null = [];
  quotesIt: QuoteIt[] | null = [];
  serviceRequests: ServiceRequest[] | null = [];

  constructor(
    private serviceQuotes: QuoteService,
    private serviceRequestService: ServiceReuqestService
  ) {}

  async ngOnInit() {
    const providerString = sessionStorage.getItem('user');
    if (providerString) {
      this.provider = JSON.parse(providerString);
    }
    if (this.provider) {
      this.quotesService =
        await this.serviceQuotes.getQuotesByServiceProviderId(
          this.provider.uid
        );
    }
    if (this.quotesService) {
      this.quotesService.map(async (quote) => {
        const serviceRequest =
          await this.serviceRequestService.getServiceRequestById(quote.serviceRequestId);
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

  // async quoteByServiceRequestId(uid: string) {
  //   await this.serviceRequestService.
  // }
}
