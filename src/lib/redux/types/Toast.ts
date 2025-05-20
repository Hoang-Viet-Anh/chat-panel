import { User } from "./User";

export interface Toast {
    id?: string;
    title: string;
    type: "success" | "error" | "warning" | "info";
    content?: string;
    sender?: User;
}