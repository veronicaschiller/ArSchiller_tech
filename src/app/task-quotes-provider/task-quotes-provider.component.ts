import { Component } from '@angular/core';
import { Client } from '../../model/client.model';
import { ServiceProvider } from '../../model/service_provider.model';
import { ServiceProviderService } from '../../service/service_provider.service';
import { QuoteService } from '../../service/quote.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-quotes-provider',
  templateUrl: './task-quotes-provider.component.html',
  styleUrl: './task-quotes-provider.component.css'
})
export class TaskQuotesProviderComponent {
  taskQuotes: any
taskId: string = ''
user: Client | ServiceProvider | null = null
providerNameString: String[] = []

  constructor(
    private serviceProviderService: ServiceProviderService,
    private quoteService: QuoteService,
    private _route: ActivatedRoute,
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
          this.providerNameString.push(nameProvider.name)
        }
      })
  }

  async toggleRefuseQuote(uid: string) {
    await this.quoteService.updateQuoteRefused(uid)
  }

  async toggleAcceptQuote(uid: string) {
    await this.quoteService.updateQuoteAccepted(uid)
  }

  formatedPrice(price: number): String {
    return Number(price).toLocaleString("pt-BR", {
      style: 'currency',
      currency: 'BRL'
    })
  }
}
