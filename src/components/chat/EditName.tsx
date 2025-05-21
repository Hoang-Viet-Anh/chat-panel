'use client'

import useAddBot from "@/hooks/useAddBot";
import CreateChatDialog from "../ui/CustomDialog";
import FullNameForm from "../ui/FullNameForm";
import IconButton from "../ui/IconButton";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { compareNames } from "@/lib/utils";
import { useEffect, useState } from "react";
import { setCurrentUser } from "@/lib/redux/slices/chatRoomSlice";
import useToast from "@/hooks/useToast";
import { useRenameBotMutation } from "@/lib/redux/api/chatApi";
import { useParams } from "next/navigation";

export default function EditName() {
    const { chatId } = useParams();
    const [open, setOpen] = useState(false);
    const firstName = useSelector((state: any) => state.formData.firstName);
    const lastName = useSelector((state: any) => state.formData.lastName);
    const { handleClose, handleOpen } = useAddBot();
    const { addToast } = useToast();
    const currentUser = useSelector((state: any) => state.chatRoom.currentUser);
    const dispatch = useDispatch();
    const [renameRequest, { data, isLoading, isSuccess, isError }] = useRenameBotMutation();

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setCurrentUser(data));
            addToast({
                title: 'Success',
                content: 'User name updated',
                type: 'success'
            });
            handleClose(isLoading, setOpen);
        }
        if (isError) {
            addToast({
                title: 'Error',
                content: 'Failed to update user name',
                type: 'error'
            });
        }
    }, [isSuccess, isError, data])

    const handleSubmit = () => {
        if (compareNames(currentUser, { firstName: firstName.trim(), lastName: lastName.trim() })) {
            handleClose(isLoading, setOpen);
            return;
        }
        renameRequest({
            user: {
                firstName: firstName.trim(),
                lastName: lastName.trim()
            },
            userId: currentUser?._id,
            chatId: chatId?.toString() ?? ''
        });
    }

    return (
        <>
            <IconButton type="button" className="rounded-lg" onClick={() => handleOpen(setOpen, currentUser?.firstName, currentUser?.lastName)}>
                <Pencil className="w-5 h-5" />
            </IconButton>
            <CreateChatDialog isOpen={open} handleClose={() => handleClose(isLoading, setOpen)}>
                <FullNameForm isLoading={isLoading} sendRequest={handleSubmit} title="Edit user name" buttonName="Edit" />
            </CreateChatDialog>
        </>
    );
}