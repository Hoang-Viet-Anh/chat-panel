'use client'

import IconButton from "../ui/IconButton";
import CreateChatDialog from "../ui/CustomDialog";
import CustomButton from "../ui/CustomButton";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useToast from "@/hooks/useToast";
import useAddBot from "@/hooks/useAddBot";
import { useDeleteChatMutation } from "@/lib/redux/api/chatApi";
import { clearChatRoom } from "@/lib/redux/slices/chatRoomSlice";
import { useParams, useRouter } from "next/navigation";

export default function DeleteChat() {
    const { chatId } = useParams();
    const [open, setOpen] = useState(false);
    const { addToast } = useToast();
    const { handleClose } = useAddBot();
    const [deleteChat, { isLoading, isSuccess, isError }] = useDeleteChatMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (isSuccess) {
            router.push(`/`);
            dispatch(clearChatRoom());
            handleClose(isLoading, setOpen);
            addToast({
                title: 'Chat deleted',
                content: 'You have successfully deleted the chat',
                type: "success"
            });
        }
        if (isError) {
            addToast({
                title: 'Error',
                content: 'Failed to delete chat',
                type: "error"
            });
        }
    }, [isSuccess, isError])

    return (
        <>
            <IconButton type="button" className="rounded-lg min-w-fit" onClick={() => setOpen(true)}>
                <Trash className="w-5 h-5 stroke-red-600" />
            </IconButton>
            <CreateChatDialog isOpen={open} handleClose={() => handleClose(isLoading, setOpen)}>
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-center text-xl">Delete chat</h1>
                </div>
                <div className="flex flex-col items-start gap-2 w-full my-2">
                    <p className="text-center">Are you sure you want to delete this chat?</p>
                </div>
                <div className="flex flex-row w-full gap-2 justify-end">
                    <CustomButton type="button" className="px-4 py-2 border-red-500" onClick={() => deleteChat(chatId?.toString() ?? '')} disabled={isLoading}>
                        <p className="text-red-500">Delete</p>
                    </CustomButton>
                    <CustomButton type="button" className="px-4 py-2" onClick={() => handleClose(isLoading, setOpen)} disabled={isLoading}>
                        <p className="text-black">Cancel</p>
                    </CustomButton>
                </div>
            </CreateChatDialog>
        </>
    );
}
