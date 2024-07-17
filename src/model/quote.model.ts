import { Timestamp } from 'firebase/firestore';

export class Quote {
    uid!: string;
    price!: number;
    serviceProviderId!: string;
    serviceRequestId!: string;
    clientAccepted: boolean = false;
    createdAt!: Timestamp
    updatedAt!: Timestamp
    deletedAt?: Timestamp | null

    constructor (
        price: number,
        serviceProviderId: string,
        serviceRequestId: string,

    ) {
        this.price = price;
        this.serviceProviderId = serviceProviderId;
        this. serviceRequestId =  serviceRequestId;
      }
}

