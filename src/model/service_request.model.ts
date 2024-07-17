import { Services } from './services.interface'
import { Quote } from './quote.model'
import { Timestamp } from 'firebase/firestore';

export class ServiceRequest {
    uid!: string;
    title!: string;
    description!: string;
    tagService!: Services[];
    priority!: Priority
    clientId!: string;
    serviceProviderId?: string;
    city!: string;
    state!: State;
    createdAt!: Timestamp
    updatedAt!: Timestamp
    deletedAt?: Timestamp
    quotes?: Quote[]
    isActived: Boolean = true

    constructor (
        title: string,
        description: string,
        tagService: Services[],
        priority: Priority,
        city: string,
        state: State,

    ) {
        this.title = title;
        this.description = description;
        this.tagService = tagService;
        this.priority = priority;
        this.city = city;
        this.state = state;
      }
}

enum Priority {
VERY_LOW = 'VERY_LOW',
LOW = 'LOW',
MEDIUM = 'MEDIUM',
HIGH = 'HIGH',
VERY_HIGH = 'VERY_HIGH',
}

enum State {
    AC = 'AC', // Acre
    AL = 'AL', // Alagoas
    AM = 'AM', // Amazonas
    AP = 'AP', // Amapá
    BA = 'BA', // Bahia
    CE = 'CE', // Ceará
    DF = 'DF', // Distrito Federal
    ES = 'ES', // Espírito Santo
    GO = 'GO', // Goiás
    MA = 'MA', // Maranhão
    MG = 'MG', // Minas Gerais
    MS = 'MS', // Mato Grosso do Sul
    MT = 'MT', // Mato Grosso
    PA = 'PA', // Pará
    PB = 'PB', // Paraíba
    PE = 'PE', // Pernambuco
    PI = 'PI', // Piauí
    PR = 'PR', // Paraná
    RJ = 'RJ', // Rio de Janeiro
    RN = 'RN', // Rio Grande do Norte
    RO = 'RO', // Rondônia
    RR = 'RR', // Roraima
    RS = 'RS', // Rio Grande do Sul
    SC = 'SC', // Santa Catarina
    SE = 'SE', // Sergipe
    SP = 'SP', // São Paulo
    TO = 'TO'  // Tocantins
}