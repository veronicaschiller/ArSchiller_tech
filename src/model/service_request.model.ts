import { Quote } from './quote.model'
import { Timestamp } from 'firebase/firestore';

export class ServiceRequest {
    uid!: string;
    title!: string;
    description!: string;
    tagService!: String[];
    priority!: string
    clientId!: string;
    serviceProviderId?: string;
    city!: string;
    state!: string;
    createdAt!: Timestamp
    updatedAt!: Timestamp
    deletedAt?: Timestamp | null
    quotes?: Quote[]
    isActived: Boolean = true

    constructor (
        title: string,
        description: string,
        tagService: String[],
        priority: string,
        city: string,
        state: string,

    ) {
        this.title = title;
        this.description = description;
        this.tagService = tagService;
        this.priority = priority;
        this.city = city;
        this.state = state;
      }
}