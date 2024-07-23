import { Injectable } from '@angular/core';
import { Quote } from '../model/quote.model';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
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
        console.log('Demandas não encontradas')
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

  async getQuotesByServiceProviderId(uid: string) {
    try {
      const serviceRequest = collection(dbFirebase, this.dbPath)
      const q = query(serviceRequest, where('serviceProviderId', '==', uid))

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        console.log('Demandas não encontradas')
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

  async updateQuoteAccepted(uid: string) {
    const quote = collection(dbFirebase, this.dbPath)
    const q = query(quote, where('uid', '==', uid))

    const querySnapShot = await getDocs(q)

    if (querySnapShot.empty) {
     console.log('Orçamento não encontrado')
    }
    let id: string = ''
    let quoteData: any
    querySnapShot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() }
      quoteData = doc.data()
      quoteData.status = 'accepted'
      id = data.id
    })

    const docRef = doc(dbFirebase, 'quotes', id)
    await updateDoc(docRef, quoteData).then(() => {
      alert(`Demanda Alterada com sucesso`)
    })
  }

  async updateQuoteRefused(uid: string) {
    const quote = collection(dbFirebase, this.dbPath)
    const q = query(quote, where('uid', '==', uid))

    const querySnapShot = await getDocs(q)

    if (querySnapShot.empty) {
      console.log('Orçamento não encontrado')
    }
    let id: string = ''
    let quoteData: any
    querySnapShot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() }
      quoteData = doc.data()
      quoteData.status = 'refused'
      id = data.id
    })

    const docRef = doc(dbFirebase, 'quotes', id)
    await updateDoc(docRef, quoteData).then(() => {
      alert(`Demanda Alterada com sucesso`)
    })
  }

  async deleteQuotesById(uid: string) {
    try {
      const quotes = collection(dbFirebase, this.dbPath)
      const q = query(quotes, where('uid', '==', uid))

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        console.log('Sem orçamentos')
      }
      let id: string = ''
      querySnapShot.forEach((doc) => {
        const data = {id: doc.id, ...doc.data()}
        id = data.id
      })

      const docRef = doc(dbFirebase, 'quotes', id)
      await deleteDoc(docRef).then(() => {
        alert(`Orçamento Excluído com sucesso`)
      })
    
    } catch (error) {
      throw new Error(`Error message: ${error}`)
    }
  }
}