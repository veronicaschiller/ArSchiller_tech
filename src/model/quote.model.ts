export class Quote {
    uid!: string;
    price!: number;
    serviceProviderId!: string;
    serviceRequestId!: string;
    clientAccepted: boolean = false;
    createdAt!: Date
    updatedAt!: Date
    deletedAt?: Date
}

