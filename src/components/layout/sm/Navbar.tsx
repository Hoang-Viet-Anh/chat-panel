'use client'

import { useState } from "react";
import { ArrowLeft, Menu, Search } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import MenuDrawer from "./MenuDrawer";
import { useDispatch, useSelector } from "react-redux";
import { setChatFilter, setDrawerOpen } from "@/lib/redux/slices/appSlice";
import UserProfile from "../UserProfile";
import AddBot from "../AddBot";
import ChatFeaturesBar from "../ChatFeatures";

export default function Navbar() {
    const openDrawer = useSelector((state: any) => state.app.isDrawerOpen);
    const [searchOpen, setSearchOpen] = useState(false);
    const chatFilter = useSelector((state: any) => state.app.chatFilter);
    const dispatch = useDispatch();

    return (
        <>
            <div className="flex lg:hidden flex-row items-center justify-between w-full p-2">
                <div className={"absolute flex flex-row gap-2 items-center transition-all duration-100 delay-100" +
                    (searchOpen ? " opacity-0 pointer-events-none" : " opacity-100 pointer-events-auto")}>
                    <IconButton type="button" className="rounded-lg" onClick={() => dispatch(setDrawerOpen(true))}>
                        <Menu className={"transition-transform duration-300 " + (searchOpen ? "rotate-180" : "rotate-0")} />
                    </IconButton>
                    <h1 className="text-cyan-500 text-xl">Chats</h1>
                </div>
                <div className={"flex w-full flex-row gap-2 items-center transition-all duration-100 delay-100" +
                    (searchOpen ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none")}>
                    <IconButton type="button" className="rounded-lg" onClick={() => setSearchOpen(false)}>
                        <ArrowLeft />
                    </IconButton>
                    <input type="text" className="w-full focus-visible:outline-none border-b-2 border-gray-300 py-2 px-4 text-black"
                        placeholder="Search chats" value={chatFilter} onChange={(e) => dispatch(setChatFilter(e.target.value))} />
                </div>
                <IconButton type="button" className="rounded-lg" onClick={() => setSearchOpen(true)}>
                    <Search />
                </IconButton>
            </div>
            <MenuDrawer isOpen={openDrawer} handleClose={() => dispatch(setDrawerOpen(false))}>
                <UserProfile />
                <AddBot />
                <ChatFeaturesBar />
            </MenuDrawer>
        </>
    )
}