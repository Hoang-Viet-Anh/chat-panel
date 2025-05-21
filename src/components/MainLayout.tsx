'use client'

import useSocket from "@/hooks/useSocket";
import ToastList from "./ToastList";
import UserProfile from "@/components/layout/UserProfile";
import ChatList from "./layout/ChatList";
import AddBot from "@/components/layout/AddBot";
import Navbar from "./layout/sm/Navbar";
import ChatFeaturesBar from "./layout/ChatFeatures";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    useSocket();
    const path = usePathname();
    const isChatRoom = path.includes('chat');

    return (
        <>
            <div className="flex flex-row h-screen w-screen items-center justify-center text-black">
                <div className="flex flex-col w-full lg:max-w-[400px] h-screen bg-white border-2 border-gray-300">
                    <div className={isChatRoom ? " hidden lg:block" : ""}>
                        <Navbar />
                        <div className="hidden lg:flex flex-col w-full">
                            <UserProfile />
                            <ChatFeaturesBar />
                            <AddBot />
                        </div>
                        <ChatList />
                    </div>
                    <div className={"flex flex-col bg-gray-100 h-full w-full lg:hidden " + (isChatRoom ? "" : "hidden")}>
                        {children}
                    </div>
                </div>
                <div className="hidden lg:flex flex-col h-full flex-1 bg-gray-100">
                    {children}
                </div>
            </div>
            <ToastList />
        </>
    );
}
