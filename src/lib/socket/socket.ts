import { io, Socket } from "socket.io-client";

const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL, {
    autoConnect: false,
    withCredentials: true
});

export default socket;