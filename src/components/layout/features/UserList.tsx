'use client'

import { useEffect, useState } from "react";
import { User } from "@/lib/redux/types/User";
import { Loader2 } from "lucide-react";
import useToast from "@/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/lib/redux/slices/userSuggestionSlice";
import { useGetUsersListQuery } from "@/lib/redux/api/chatApi";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const selectedUser = useSelector((state: any) => state.userSuggestion.selectedUser);
    const filter = useSelector((state: any) => state.userSuggestion.filter);
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const {
        data: userList,
        isLoading: isLoadingUsers,
        isSuccess: isSuccessUsers,
        isError: isErrorUsers
    } = useGetUsersListQuery(filter);

    useEffect(() => {
        if (isSuccessUsers && userList) {
            setUsers(userList);
        }
        if (isErrorUsers) {
            addToast({
                title: 'Error',
                content: 'Error loading users',
                type: 'error'
            });
        }
    }, [userList, isSuccessUsers, isErrorUsers])

    const onUserSelect = (user: User) => {
        if (selectedUser?._id === user._id) {
            dispatch(setSelectedUser(null));
            return;
        }
        dispatch(setSelectedUser(user));
    }

    return (
        <>
            <h1 className="text-start text-lg w-full">Users</h1>
            <div className="flex flex-col gap-2 w-full h-80 items-center overflow-y-auto">
                {isLoadingUsers ?
                    <div className="h-full flex flex-col items-center justify-center w-full">
                        <Loader2 className="animate-spin" />
                    </div>
                    :
                    users.length === 0 ?
                        <div className="flex flex-col items-center justify-center h-full w-full">
                            <h1 className="text-center">No users found</h1>
                        </div>
                        :
                        users.map(user => {
                            return (
                                <button type="button" onClick={() => onUserSelect(user)} className={"flex flex-row items-center gap-2 w-full hover:bg-gray-200 transition-all duration-100 p-2 select-none rounded-lg " + (user._id === selectedUser?._id ? "bg-gray-200" : "")} key={user._id}>
                                    <img src={user.imageUrl} alt="user avatar" className="w-10 rounded-full bg-white" />
                                    <div className="flex flex-col items-center w-full overflow-hidden">
                                        <p className="text-start w-full truncate">{user.firstName} {user.lastName}</p>
                                        <p className="text-start text-xs text-gray-600 w-full truncate">{user.email}</p>
                                    </div>
                                </button>
                            )
                        })
                }
            </div>
        </>
    )
}