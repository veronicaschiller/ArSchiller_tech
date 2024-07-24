import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../model/client.model';
import { QuoteService } from '../../service/quote.service';
import { ServiceProviderService } from '../../service/service_provider.service';
import { ServiceProvider } from '../../model/service_provider.model';


@Component({
  selector: 'app-task-quotes',
  templateUrl: './task-quotes.component.html',
  styleUrl: './task-quotes.component.css'
})

export class TaskQuotesComponent implements OnInit {
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
  }

  async toggleRefuseQuote(uid: string) {
    await this.quoteService.updateQuoteRefused(uid)
  }

  async toggleAcceptQuote(uid: string) {
    await this.quoteService.updateQuoteAccepted(uid)
  }

  formatedPrice(price: number): String {
    return price.toLocaleString("pt-BR", {
      style: 'currency',
      currency: 'BRL'
    })
  }

  async getProviderName(uid: string) { 
        const provider = await this.serviceProviderService.getProviderById(uid)
        return provider.name
      }
}
