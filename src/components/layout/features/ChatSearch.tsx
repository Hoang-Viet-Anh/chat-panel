'use client'

import { setChatFilter } from "@/lib/redux/slices/appSlice";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatSearch() {
    const chatFilter = useSelector((state: any) => state.app.chatFilter);
    const dispatch = useDispatch();

    return (
        <div className="hidden lg:flex items-center justify-center rounded-2xl w-full bg-white border-2 border-gray-200">
            <Search className="pl-2 h-7 w-7 pointer-events-none" />
            <input type="text" className="ml-2 w-full rounded-2xl bg-white py-2 text-sm text-gray-500 focus-visible:outline-none"
                placeholder="Search or start new chat" value={chatFilter} onChange={(e) => dispatch(setChatFilter(e.target.value))} />
        </div>
    )
}