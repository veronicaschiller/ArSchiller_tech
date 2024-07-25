import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../model/client.model';
import { QuoteService } from '../../service/quote.service';
import { ServiceProviderService } from '../../service/service_provider.service';
import { ServiceProvider } from '../../model/service_provider.model';
import { ServiceReuqestService } from '../../service/service_request.service';


@Component({
  selector: 'app-task-quotes',
  templateUrl: './task-quotes.component.html',
  styleUrl: './task-quotes.component.css'
})

export class TaskQuotesComponent implements OnInit {
taskQuotes: any
taskId: string = ''
user: Client | ServiceProvider | null = null
providerNameString: ServiceProvider[] = []

  constructor(
    private serviceProviderService: ServiceProviderService,
    private quoteService: QuoteService,
    private _route: ActivatedRoute,
    private serviceRequestService: ServiceReuqestService
  ) {}

  async ngOnInit() {
    this.taskId = String(this._route.snapshot.paramMap.get('taskId'))
    this.taskQuotes = await this.quoteService.getQuotesByServiceRequestId(this.taskId)
    const userString = sessionStorage.getItem('user')
      if(userString) {
        this.user = JSON.parse(userString)
      }
      this.taskQuotes.map(async (quote: any) => {
        if(quote.serviceProviderId) {
          const nameProvider = await this.serviceProviderService.getProviderById(quote.serviceProviderId)
          this.providerNameString.push(nameProvider)
        }
      })
  }

  async toggleRefuseQuote(uid: string) {
    await this.quoteService.updateQuoteRefused(uid)
  }

  async toggleAcceptQuote(quoteId: string, providerId: string) {
    await this.serviceRequestService.updateFinishServiceRequestById(this.taskId, providerId)
    await this.quoteService.updateQuoteAccepted(quoteId)
  }

  formatedPrice(price: number): String {
    return Number(price).toLocaleString("pt-BR", {
      style: 'currency',
      currency: 'BRL'
    })
  }
}
