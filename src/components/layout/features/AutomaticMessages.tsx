'use client'

import { useEffect, useState } from "react";
import CustomButton from "../../ui/CustomButton";
import { useDisableAutoMessagesMutation, useEnableAutoMessagesMutation } from "@/lib/redux/api/chatApi";
import useToast from "@/hooks/useToast";

export default function AutomaticMessages() {
    const [isActive, setIsActive] = useState(false);
    const { addToast } = useToast();
    const [enableAutomatic, { isLoading: isLoading1, isSuccess: isSuccess1, isError: isError1 }] = useEnableAutoMessagesMutation();
    const [disableAutomaic, { isLoading: isLoading2, isSuccess: isSuccess2, isError: isError2 }] = useDisableAutoMessagesMutation();

    useEffect(() => {
        if (isSuccess1) {
            setIsActive(true);
            addToast({
                title: 'Automatic messages enabled',
                content: 'You have successfully enabled automatic messages',
                type: 'success'
            });
        }
        if (isError1) {
            addToast({
                title: 'Automatic messages error',
                content: 'Something went wrong while enabling automatic messages',
                type: 'error'
            });
        }
    }, [isSuccess1, isError1])

    useEffect(() => {
        if (isSuccess2) {
            setIsActive(false);
            addToast({
                title: 'Automatic messages disabled',
                content: 'You have successfully disabled automatic messages',
                type: 'success'
            });
        }
        if (isError2) {
            addToast({
                title: 'Automatic messages error',
                content: 'Something went wrong while disabling automatic messages',
                type: 'error'
            });
        }
    }, [isSuccess2, isError2])

    const handleClick = () => {
        if (isActive) {
            disableAutomaic();
        } else {
            enableAutomatic();
        }
    }


    return (
        <div className="flex flex-row justify-between items-center w-full">
            <p className="text-cyan-500 text-lg">Automatic messages</p>
            <CustomButton type="button" onClick={handleClick}
                className={"rounded-lg transition-all duration-200 " + (isActive ? "text-red-500 border-red-500" : "")} disabled={isLoading1 || isLoading2}>
                {isActive ?
                    "Disable"
                    :
                    "Enable"
                }
            </CustomButton>
        </div>
    );
}