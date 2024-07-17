import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Quote } from '../model/quote.model';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {
    async createQuote(data: Quote): Promise<Quote> {
      const quote = new Quote (
        data.price,
        data.serviceProviderId,
        data.serviceRequestId,
      )
      return quote
    }
}