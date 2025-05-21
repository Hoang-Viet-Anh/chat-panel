'use client'

import { User } from "@/lib/redux/types/User"
import NavigationElement from "./NavigationElement"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setChats, setUnreadCounts, setUserProfile, setUsers } from "@/lib/redux/slices/appSlice";
import socket from "@/lib/socket/socket";
import useToast from "@/hooks/useToast";
import { useGetAllChatsQuery, useGetMeQuery } from "@/lib/redux/api/chatApi";

export default function ChatList() {
    const dispatch = useDispatch();
    const users: User[] = useSelector((state: any) => state.app.users);
    const chatFilter = useSelector((state: any) => state.app.chatFilter);
    const { addToast } = useToast();
    const {
        data: userProfile,
        isLoading: isLoadingUserProfile,
        isSuccess: isSuccessUserProfile,
        isError: isErrorUserProfile
    } = useGetMeQuery();
    const {
        data: chatsData,
        isLoading: isLoadingChats,
        isError: isErrorChats,
        isSuccess: isSuccessChats
    } = useGetAllChatsQuery(undefined, { skip: !isSuccessUserProfile });

    useEffect(() => {
        if (isSuccessUserProfile && userProfile) {
            dispatch(setUserProfile(userProfile));
        }
        if (isSuccessChats && chatsData) {
            const { chats, users, unreadCounts } = chatsData;
            dispatch(setChats(chats));
            dispatch(setUsers(users));
            dispatch(setUnreadCounts(unreadCounts));
            socket.connect();
        }
        if (isErrorUserProfile) {
            addToast({
                title: 'Error',
                content: 'Error loading user profile',
                type: 'error'
            });
        }
    }, [
        userProfile, isSuccessUserProfile, isErrorUserProfile,
        chatsData, isSuccessChats, isErrorChats
    ])

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(chatFilter.toLowerCase()));

    return (
        <>
            <div className="flex-1 w-full h-full overflow-y-auto">
                {isLoadingUserProfile || isLoadingChats ?
                    new Array(9).fill(9).map((_, index) => {
                        return (
                            <div key={index} className="flex flex-row w-full h-[82px] bg-white p-4">
                                <div className="flex flex-row items-center gap-2 w-full">
                                    <div className="w-12 h-10 rounded-full bg-gray-300 animate-pulse" />
                                    <div className="flex flex-col gap-1 items-start w-full overflow-hidden">
                                        <div className="animate-pulse bg-gray-300 w-32 h-5 rounded-lg" />
                                        <p className="w-52 animate-pulse bg-gray-300 h-5 rounded-lg" />
                                    </div>
                                </div>
                                <div className="flex items-start justify-end">
                                    <p className="bg-gray-300 w-20 h-4 animate-pulse  rounded-lg" />
                                </div>
                            </div>
                        )
                    })
                    :
                    filteredUsers.length === 0 ?
                        <div className="flex flex-col items-center justify-center h-full w-full">
                            <h1 className="text-center">No users found</h1>
                        </div>
                        :
                        filteredUsers.map((user: User, index: number) => {
                            return <NavigationElement key={index} user={user} />
                        })
                }
            </div>
        </>
    )
}