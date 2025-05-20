export type Chat = {
    _id?: string;
    users: string[];
    lastMessage?: {
        content: string;
        timestamp: string;
    }
}