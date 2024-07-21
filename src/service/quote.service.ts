import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Quote } from '../model/quote.model';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { dbFirebase } from '../envitonments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {
  private dbPath = '/quotes'
  serviceRequestRef: AngularFireList<any>

  constructor(private db: AngularFireDatabase) {
    this.serviceRequestRef = this.db.list(this.dbPath)
  }

  async createQuote(data: Quote): Promise<Quote> {
    const quote = new Quote(
      data.price,
      data.serviceProviderId,
      data.serviceRequestId,
      data.status
    )
    return quote
  }

  async getQuotesByServiceRequestId(uid: string) {
    try {
      const serviceRequest = collection(dbFirebase, this.dbPath)
      const q = query(serviceRequest, where('serviceRequestId', '==', uid))

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        throw new Error('Demandas não encontradas')
      }

      let quotesArray: Quote[] = [];

      querySnapShot.forEach((doc) => {
        const data = doc.data()
        const quoteData: Quote = {
          uid: data['uid'],
          price: data['price'],
          serviceProviderId: data['serviceProviderId'],
          serviceRequestId: data['serviceRequestId'],
          status: data['status'],
          createdAt: data['createdAt'],
          updatedAt: data['updatedAt'],
          deletedAt: data['deletedAt'],
        }

        quotesArray.push(quoteData);
      });
      return quotesArray;
    } catch (error) {
      throw new Error(`Error ao encontrar a demanda: ${error}`)
    }
  }
}