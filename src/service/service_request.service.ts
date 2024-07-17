import { Injectable } from '@angular/core';
import { ServiceRequest } from '../model/service_request.model';

@Injectable({
  providedIn: 'root'
})

export class ServiceReuqestService {
  async createServiceRequest(data: ServiceRequest): Promise<ServiceRequest> {
    const serviceRequest = new ServiceRequest (
      data.title,
      data.description,
      data.tagService,
      data.priority,
      data.city,
      data.state
    )
    return serviceRequest
  }
}