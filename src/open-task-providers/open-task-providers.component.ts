import { Component } from '@angular/core';
import { ServiceRequest } from '../model/service_request.model';
import { ServiceProvider } from '../model/service_provider.model';
import { QuoteService } from '../service/quote.service';
import { ServiceReuqestService } from '../service/service_request.service';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { Quote } from '../model/quote.model';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Firestore } from '@angular/fire/firestore';

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
  switchContent: { [key: string]: boolean } = {}
  price: number = 0;


  constructor(
    private router: Router,
    private serviceQuotes: QuoteService,
    private serviceRequestService: ServiceReuqestService,
    private firestore: Firestore,
  ) { }

  quote: Quote = {
      uid: uuidv4(),
      price: 0,
      serviceProviderId: '',
      serviceRequestId: '',
      status: '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      deletedAt: null
  };

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
    if (this.provider && serviceId) {
      const quote = await this.serviceQuotes.getQuoteByServiceIdAndServiceProviderId(serviceId, this.provider.uid)
      if (!quote) {
        this.quote.serviceProviderId = this.provider.uid
        this.quote.serviceRequestId = serviceId
        const quoteDoc = collection(this.firestore, 'quotes');
        addDoc(quoteDoc, this.quote).then(() => {
        console.log(this.quote);
      })
      .catch((err) => {
        console.log(err);
      });
      } else {
        alert("Você já cadastrou um orçamento para essa demanda")
      }
    }
    this.switchContent[serviceId] = !this.switchContent[serviceId];
  }
}
