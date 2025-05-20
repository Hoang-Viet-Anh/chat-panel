'use client'

import useSocket from "@/hooks/useSocket";
import ToastList from "./ToastList";
import UserProfile from "@/components/layout/UserProfile";
import ChatSearchBar from "@/components/layout/ChatFeatures";
import ChatList from "./layout/ChatList";
import AddBot from "@/components/layout/AddBot";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    useSocket();

    return (
        <>
            <div className="flex flex-row h-screen w-screen items-center justify-center text-black">
                <div className="flex flex-col w-full max-w-[400px] h-screen bg-white border-2 border-gray-300">
                    <UserProfile />
                    <ChatSearchBar />
                    <AddBot />
                    <ChatList />
                </div>
                <div className="flex flex-col w-full h-screen bg-gray-100">
                    {children}
                </div>
            </div>
            <ToastList />
        </>
    );
}
