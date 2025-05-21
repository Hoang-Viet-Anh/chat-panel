'use client'

import { useSelector } from "react-redux";
import AutomaticMessages from "./features/AutomaticMessages";
import AddExistingUser from "./features/AddUser";
import ChatSearch from "./features/ChatSearch";

export default function ChatFeaturesBar() {
    const userProfile = useSelector((state: any) => state.app.userProfile);
    const isAuthorized = userProfile?.googleId != undefined;

    return (
        <>
            <div className="flex flex-col justify-center gap-3 items-center w-full lg:pb-4 lg:px-4 lg:bg-gray-100 lg:border-b-2 border-gray-300">
                <ChatSearch />
                <AutomaticMessages />
                {isAuthorized ?
                    <AddExistingUser />
                    : null
                }
            </div>
        </>
    )
}