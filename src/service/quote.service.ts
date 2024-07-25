import { Injectable } from '@angular/core';
import { Quote } from '../model/quote.model';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
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

  async createQuote(data: Quote): Promise<Object> {
    const quoteDoc = collection(dbFirebase, this.dbPath);
    addDoc(quoteDoc, data)
      .then(() => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
      return data
  }

  async getQuotesByServiceRequestId(uid: string) {
    try {
      const serviceRequest = collection(dbFirebase, this.dbPath)
      const q = query(serviceRequest,
        where('serviceRequestId', '==', uid),
        where('status', '==', '')
      )

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

  async getQuoteByServiceIdAndServiceProviderId(serviceid: string, providerid: string) {
    try {
      const quote = collection(dbFirebase, this.dbPath)
      const q = query(quote, 
        where('serviceRequestId', '==', serviceid),
        where('serviceProviderId', '==', providerid)
    )

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        console.log('Orçamento não existe');
      }

      let quoteData: any;
      querySnapShot.forEach((doc) => {
       quoteData = { id: doc.id, ...doc.data() };
      });
      
      return quoteData
    } catch (error) {
      throw new Error(`Erro ao buscar orçamento: ${error}` );
    }
  }

  async getQuotesByServiceProviderId(uid: string) {
    try {
      const quote = collection(dbFirebase, this.dbPath)
      const q = query(quote, 
        where('serviceProviderId', '==', uid),
        where('status', '==', '')
    )

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

  async getOpenQuotesByServiceProviderId(uid: string) {
    try {
      const quote = collection(dbFirebase, this.dbPath)
      const q = query(quote,
        where('serviceProviderId', '==', uid),
        where('status', '==', 'accepted'))

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

  async getFinishQuotesByServiceProviderId(uid: string) {
    try {
      const quote = collection(dbFirebase, this.dbPath)
      const q = query(quote,
        where('serviceProviderId', '==', uid),
        where('status', '==', 'finish'))

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        console.log('Orçamentos não encontrados')
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
      throw new Error(`Error ao encontrar a orçamentos: ${error}`)
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

  async updateQuoteFinish(uid: string) {
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
      quoteData.status = 'finish'
      id = data.id
    })

    const docRef = doc(dbFirebase, 'quotes', id)
    await updateDoc(docRef, quoteData).then(() => {
      alert(`Demanda Alterada com sucesso`)
    })
  }

  async updateQuoteFinishByServiceRequestIdAndServiceProviderId(serviceId: string, providerId:string) {
    const quote = collection(dbFirebase, this.dbPath)
    const q = query(quote, 
      where('serviceRequestId', '==', serviceId),
    )

    const querySnapShot = await getDocs(q)

    if (querySnapShot.empty) {
      console.log('Orçamento não encontrado')
    }
    let id: string = ''
    let quoteData: any
    querySnapShot.forEach((doc) => {
      const data = doc.data()
      console.log(serviceId)
      console.log(data['serviceRequestId'])
      console.log(providerId)
      console.log(data['serviceProviderId'])
      if(data['serviceProviderId'] === providerId) {
        data['status'] = 'finish'
        id = doc.id
      }
      quoteData = data
    })
    if(id) {
    const docRef = doc(dbFirebase, 'quotes', id)
    await updateDoc(docRef, quoteData).then(() => {
      alert(`Orçamento finalizado com sucesso`)
    }) 
  } else {
    console.log('Nenhum orçamento correspondente encontrado para o serviceProviderId  e serviceId fornecidos');
    }
  }

  async deleteQuotesById(uid: string) {
    try {
      const quote = collection(dbFirebase, this.dbPath)
      const q = query(quote, where('uid', '==', uid))

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