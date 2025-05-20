import { User } from "@/lib/redux/types/User";

export const compareNames = (user1: User, user2: User) => {
    if (user1.firstName === user2.firstName && user1.lastName === user2.lastName) {
        return true;
    }
    return false;
}