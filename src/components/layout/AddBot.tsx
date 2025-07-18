'use client'

import useAddBot from "@/hooks/useAddBot";
import CustomButton from "../ui/CustomButton";
import CreateChatDialog from "../ui/CustomDialog";
import FullNameForm from "../ui/FullNameForm";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { useAddBotMutation } from "@/lib/redux/api/chatApi";
import { setDrawerOpen } from "@/lib/redux/slices/appSlice";

export default function AddBot() {
    const [createBot, { isLoading, isSuccess, isError }] = useAddBotMutation();
    const { addToast } = useToast();
    const { handleClose, handleOpen } = useAddBot();
    const firstName = useSelector((state: any) => state.formData.firstName);
    const lastName = useSelector((state: any) => state.formData.lastName);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            addToast({
                title: 'Chat created',
                content: 'Chat created successfully',
                type: 'success'
            });
            handleClose(isLoading, setOpen);
            dispatch(setDrawerOpen(false));
        }

        if (isError) {
            addToast({
                title: 'Error',
                content: 'Error creating chat',
                type: 'error'
            });
        }
    }, [isSuccess, isError])

    const handleSubmit = () => {
        createBot({ firstName, lastName });
    }

    return (
        <>
            <div className="flex flex-row justify-between items-start w-full p-0 lg:p-4 ">
                <h1 className="hidden lg:block text-cyan-500 text-xl">Chats</h1>
                <CustomButton type="button" onClick={() => handleOpen(setOpen)} className="w-full py-2 lg:py-1 lg:w-auto text-nowrap overflow-hidden">
                    Create new chat
                </CustomButton>
            </div>
            <CreateChatDialog isOpen={open} handleClose={() => handleClose(isLoading, setOpen)}>
                <FullNameForm isLoading={isLoading} sendRequest={handleSubmit} title="Create new chat" buttonName="Create" />
            </CreateChatDialog>
        </>
    );
}