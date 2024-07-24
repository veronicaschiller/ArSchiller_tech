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
  status: 'accepted' | 'refused' | '';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp | null;
  serviceRequest: ServiceRequest;
}
@Component({
  selector: 'app-finish-quotes-provider',
  templateUrl: './finish-quotes-provider.component.html',
  styleUrl: './finish-quotes-provider.component.css'
})
export class FinishQuotesProviderComponent {
  provider: ServiceProvider | null = null;
  quotesService: Quote[] | null = [];
  quotesIt: QuoteIt[] | null = [];
  serviceRequests: ServiceRequest[] | null = [];
  selectButton:string = 'open'

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

  // função para quando selecionar o botão ele ficar ativo e os outros inativos 
  selecteButton(button:string){
    this.selectButton = button;
  }
  // função que deve se aplicada no botão
  // <button 
  //   [class.selected]="selectedButton === 'aberto'"
  //   (click)="selectButton('aberto')">
  //   Orçamentos Em Aberto
  // </button>

}
