import { Timestamp } from 'firebase/firestore';

export class ServiceProvider {
    uid!: string;
    name!: string;
    email!: string;
    password!: string;
    emailVerified: boolean = false;
    services!: String[]
    createdAt!: Timestamp
    updatedAt!: Timestamp
    deletedAt?: Timestamp | null

    constructor (
        name: string,
        email: string,
        password: string,
        services: String[]

    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.services = services;
      }
}

