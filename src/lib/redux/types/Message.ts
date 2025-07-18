export enum MessageStatus {
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
    PENDING = 'PENDING',
    ERROR = 'ERROR',
}

type Message = {
    _id?: string;
    chatId?: string;
    sender?: string;
    content: string;
    createdAt?: string;
    status?: MessageStatus;
}

export type { Message };