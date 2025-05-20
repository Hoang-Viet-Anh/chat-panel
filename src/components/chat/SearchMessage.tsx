'use client'

import IconButton from "@/components/ui/IconButton";
import { Message } from "@/lib/redux/types/Message";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setMatchedMessage } from "@/lib/redux/slices/chatRoomSlice";

export default function SearchMessage() {
    const [isActive, setIsActive] = useState(false);
    const [searchResults, setSearchResults] = useState<Message[]>([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [searchText, setSearchText] = useState('');
    const messages: Message[] = useSelector((state: any) => state.chatRoom.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isActive) {
            setSearchResults([]);
            setSearchText('');
            setCurrentMessageIndex(0);
        }
    }, [isActive])

    useEffect(() => {
        if (searchResults.length > 0) {
            dispatch(setMatchedMessage(searchResults[0]));
        }
        setCurrentMessageIndex(0);
    }, [searchResults])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchText.trim() === '') {
            setSearchResults([]);
            return;
        }
        const filteredMessages = messages.filter((message: Message) => message.content.toLowerCase().includes(searchText.toLowerCase())).reverse();
        setSearchResults(filteredMessages);
    }

    const handleNextMessage = () => {
        if (currentMessageIndex < searchResults.length - 1) {
            dispatch(setMatchedMessage(searchResults[currentMessageIndex + 1]));
            setCurrentMessageIndex(currentMessageIndex + 1);
        }
    }

    const handlePreviousMessage = () => {
        if (currentMessageIndex > 0) {
            dispatch(setMatchedMessage(searchResults[currentMessageIndex - 1]));
            setCurrentMessageIndex(currentMessageIndex - 1);
        }
    }

    return (
        <div className="flex flex-row w-full items-center justify-end gap-2">
            <div className={`flex flex-row gap-2 transition-all duration-100 ${isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                <div className="flex flex-row items-center">
                    <p className="text-nowrap mr-1">{searchResults.length > 0 ? `${currentMessageIndex + 1} of ${searchResults.length}` : 'No results found'}</p>
                    <IconButton type="button" className="rounded-lg" onClick={handleNextMessage} disabled={currentMessageIndex >= searchResults.length - 1}>
                        <ChevronUp className="w-5 h-5" />
                    </IconButton>
                    <IconButton type="button" className="rounded-lg" onClick={handlePreviousMessage} disabled={currentMessageIndex === 0}>
                        <ChevronDown className="w-5 h-5" />
                    </IconButton>
                </div>
                <form className={`flex flex-row items-center border-b-2 border-gray-300`} onSubmit={handleSearch}>
                    <input type="text" className={`w-full bg-gray-100 py-2 px-4 text-sm text-black min-w-28 focus-visible:outline-none`}
                        placeholder={isActive ? "Search message" : ""} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <IconButton type="submit" className="rounded-lg">
                        <Search className="w-5 h-5" />
                    </IconButton>
                </form>
            </div>
            <IconButton type="button" className="rounded-lg" onClick={() => { setIsActive(!isActive) }}>
                {isActive ?
                    <X className="w-5 h-5" /> :
                    <Search className="w-5 h-5" />
                }
            </IconButton>
        </div >
    );
}