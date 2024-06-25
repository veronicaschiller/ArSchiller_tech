import { randomUUID } from 'node:crypto'

export class Client {
    uid: string;
    name: string;
    email: string;
    password: string;
    emailVerified: boolean = false;
    createdAt: string
    updatedAt: string
    deletedAt?: string

    constructor(
        name: string,
        email: string,
        password: string,
        emailVerified: boolean,

    ) {
        this.uid = randomUUID()
        this.name = name;
        this.email = email;
        this.password = password;
        this.emailVerified = emailVerified;
        this.createdAt = String(Date.now());
        this.updatedAt = String(Date.now());
      }
}