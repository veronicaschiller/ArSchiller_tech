import { Injectable } from '@angular/core';
import { ServiceRequest } from '../model/service_request.model';
import { dbFirebase } from '../envitonments/environment';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { collection, where, getDocs, query, doc, deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class ServiceReuqestService {
  private dbPath = '/tasks'
  serviceRequestRef: AngularFireList<any>

  constructor(private db: AngularFireDatabase) {
    this.serviceRequestRef = this.db.list(this.dbPath)
  }

  async createServiceRequest(data: ServiceRequest): Promise<ServiceRequest> {
    const serviceRequest = new ServiceRequest(
      data.title,
      data.description,
      data.tagService,
      data.priority,
      data.city,
      data.state
    )
    return serviceRequest
  }

  async getServiceRequestByClientId(uid: string): Promise<ServiceRequest[]> {
    try {
      const serviceRequest = collection(dbFirebase, this.dbPath)
      const q = query(serviceRequest, where('clientId', '==', uid))

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        throw new Error('Cliente não tem demandas')
      }

      let serviceRequestArray: ServiceRequest[] = [];
      querySnapShot.forEach((doc) => {
        const data = doc.data()
        const serviceRequestData: ServiceRequest = {
          uid: data['uid'],
          title: data['title'],
          description: data['description'],
          tagService: data['tagService'],
          priority: data['priority'],
          clientId: data['clientId'],
          serviceProviderId: data['serviceProviderId'],
          city: data['city'],
          state: data['state'],
          createdAt: data['createdAt'],
          updatedAt: data['updatedAt'],
          deletedAt: data['deletedAt'],
          quotes: data['quotes'],
          isActived: data['isActived'],
        }

        serviceRequestArray.push(serviceRequestData);
      });
      return serviceRequestArray;
    } catch (error) {
      throw new Error('Erro ao buscar demandas')
    }
  }

  async getServiceRequestByServiceProviderServices(services: String[]): Promise<ServiceRequest[]> {
    try {
      let serviceRequestArray: ServiceRequest[] = [];
      const serviceRequest = collection(dbFirebase, this.dbPath)
      const q = query(
        serviceRequest, 
        where('tagService', 'array-contains-any', services),
        where('isActived', '==', true)
      )

      const querySnapShot = await getDocs(q)
      if (querySnapShot.empty) {
       console.log('Não há demandas para este prestador')
      }

      querySnapShot.forEach((doc) => {
        const data = doc.data()
        const serviceRequestData: ServiceRequest = {
          uid: data['uid'],
          title: data['title'],
          description: data['description'],
          tagService: data['tagService'],
          priority: data['priority'],
          clientId: data['clientId'],
          serviceProviderId: data['serviceProviderId'],
          city: data['city'],
          state: data['state'],
          createdAt: data['createdAt'],
          updatedAt: data['updatedAt'],
          deletedAt: data['deletedAt'],
          quotes: data['quotes'],
          isActived: data['isActived'],
        }
        serviceRequestArray.push(serviceRequestData);
      });
      return serviceRequestArray;
    } catch (error) {
      throw new Error('Erro ao buscar demandas')
    }
  }

  async getServiceRequestById(uid: string) {
    try {
      const serviceRequest = collection(dbFirebase, this.dbPath)
      const q = query(serviceRequest, where('uid', '==', uid))

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        console.log('Demanda não existe');
      }

      let serviceRequestData: any;
      querySnapShot.forEach((doc) => {
       serviceRequestData = { id: doc.id, ...doc.data() };
      });
      
      return serviceRequestData
    } catch (error) {
      throw new Error(`Erro ao buscar demanda: ${error}` );
    }
  }

  async deleteServiceRequestById(uid: string) {
    try {
      const serviceRequest = collection(dbFirebase, this.dbPath)
      const q = query(serviceRequest, where('uid', '==', uid))

      const querySnapShot = await getDocs(q)

      if (querySnapShot.empty) {
        console.log('Sem demandas')
      }
      let id: string = ''
      querySnapShot.forEach((doc) => {
        const data = {id: doc.id, ...doc.data()}
        id = data.id
      })

      const docRef = doc(dbFirebase, 'tasks', id)
      await deleteDoc(docRef).then(() => {
        alert(`Demanda Excluída com sucesso`)
      })
    
    } catch (error) {
      throw new Error(`Error message: ${error}`)
    }
  }
}