import { Services } from './services.interface'
import { Quote } from './quote.model'

export class ServiceRequest {
    uid!: string;
    title!: string;
    desciption!: string;
    tagService!: Services;
    priority!: Priority
    clientId!: string;
    serviceProviderId?: string;
    createdAt!: Date
    updatedAt!: Date
    deletedAt?: Date
    quotes?: Quote[]
}

enum Priority {
NOTHING_URGENT = 'NOTHING_URGENT',
LITTLE_URGENT = 'LITTLE_URGENT',
URGENT = 'URGENT',
VERY_URGENT = 'VERY_URGENT',
CRITICAL = 'CRITICAL',
}