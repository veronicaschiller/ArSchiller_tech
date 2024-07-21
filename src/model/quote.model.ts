import { Timestamp } from 'firebase/firestore';

export class Quote {
    uid!: string;
    price!: number;
    serviceProviderId!: string;
    serviceRequestId!: string;
    status: 'accepted' | 'refused' | '' = ''
    createdAt!: Timestamp
    updatedAt!: Timestamp
    deletedAt?: Timestamp | null

    constructor (
        price: number,
        serviceProviderId: string,
        serviceRequestId: string,
        status: string

    ) {
        this.price = price;
        this.serviceProviderId = serviceProviderId;
        this. serviceRequestId =  serviceRequestId;
      }
}

