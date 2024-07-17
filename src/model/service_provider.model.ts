import { Services } from './services.interface'
import { Timestamp } from 'firebase/firestore';

export class ServiceProvider {
    uid!: string;
    name!: string;
    email!: string;
    password!: string;
    emailVerified: boolean = false;
    services!: Services[]
    createdAt!: Timestamp
    updatedAt!: Timestamp
    deletedAt?: Timestamp | null

    constructor (
        name: string,
        email: string,
        password: string,
        services: Services[]

    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.services = services;
      }
}

