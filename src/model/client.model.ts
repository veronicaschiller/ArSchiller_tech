import { Timestamp } from 'firebase/firestore';

export class Client {
    uid!: string;
    name!: string;
    email!: string;
    password!: string;
    emailVerified: boolean = false;
    createdAt!: Timestamp
    updatedAt!: Timestamp
    deletedAt?: Timestamp | null

    constructor (
        name: string,
        email: string,
        password: string,

    ) {
        this.name = name;
        this.email = email;
        this.password = password;
      }
}