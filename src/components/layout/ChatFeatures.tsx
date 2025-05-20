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
            <div className="flex flex-col justify-center gap-3 items-center w-full pb-4 px-4 bg-gray-100 border-b-2 border-gray-300">
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