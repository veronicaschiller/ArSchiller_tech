import { Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export class Client {
    uid: string;
    name: string;
    email: string;
    password: string;
    emailVerified: boolean = false;
    createdAt: Timestamp
    updatedAt: Timestamp
    deletedAt?: Timestamp | null

    constructor(
        name: string,
        email: string,
        password: string,
        emailVerified: boolean,

    ) {
        this.uid = uuidv4()
        this.name = name;
        this.email = email;
        this.password = password;
        this.emailVerified = emailVerified;
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
      }
}