'use client'

import CustomButton from "../../ui/CustomButton";
import CreateChatDialog from "../../ui/CustomDialog";
import CustomInput from "../../ui/CustomInput";
import { useEffect, useState } from "react";
import Separator from "../../ui/Separator";
import { useDispatch, useSelector } from "react-redux";
import { chatApi, useCreateChatMutation } from "@/lib/redux/api/chatApi";
import UserList from "./UserList";
import useToast from "@/hooks/useToast";
import { setFilter, setSelectedUser } from "@/lib/redux/slices/userSuggestionSlice";

export default function AddUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const selectedUser = useSelector((state: any) => state.userSuggestion.selectedUser);
    const { addToast } = useToast();
    const dispatch = useDispatch();
    const [createChat, {
        isLoading: isCreatingChat,
        isSuccess: isChatCreated,
        isError: isErrorCreatingChat
    }] = useCreateChatMutation();

    useEffect(() => {
        if (isChatCreated) {
            setIsOpen(false);
            addToast({
                title: 'Chat created',
                content: 'Chat created successfully',
                type: 'success'
            });
            dispatch(chatApi.util.invalidateTags(['userList']));
        }
        if (isErrorCreatingChat) {
            addToast({
                title: 'Error',
                content: 'Error creating chat',
                type: 'error'
            });
        }
    }, [isChatCreated, isErrorCreatingChat])

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(setSelectedUser(null));
            dispatch(setFilter(email));
        }, 700);

        return () => clearTimeout(handler);
    }, [email])

    const handleAddUser = () => {
        if (selectedUser) {
            createChat(selectedUser._id ?? '');
        }
    }

    const handleClose = () => {
        if (isCreatingChat) {
            return;
        }
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex flex-row justify-between items-center w-full ">
                <h1 className="text-cyan-500 text-lg">Find user</h1>
                <CustomButton type="button" onClick={() => setIsOpen(true)}>
                    Add existing user
                </CustomButton>
            </div>
            <CreateChatDialog isOpen={isOpen} handleClose={handleClose}>
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-center text-xl">Add existing user</h1>
                </div>

                <CustomInput type="email" label="Email" placeholder="Enter user's email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <Separator className="mt-2" />
                <UserList />
                <Separator className="mb-2" />
                <div className="flex flex-row w-full justify-end">
                    <CustomButton type="submit" className="py-2 px-4 w-[150px]" onClick={handleAddUser}>
                        Add
                    </CustomButton>
                </div>
            </CreateChatDialog>
        </>
    );
}