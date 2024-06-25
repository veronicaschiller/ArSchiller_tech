import { Services } from './services.interface'

export class ServiceProvider {
    uid!: string;
    name!: string;
    email!: string;
    password!: string;
    emailVerified: boolean = false;
    services!: Services
}

