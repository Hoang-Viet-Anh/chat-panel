'use client'

import IconButton from "./IconButton";
import NavigationElement from "../layout/NavigationElement";
import type { Toast } from "@/lib/redux/types/Toast";
import useToast from "@/hooks/useToast";
import { useEffect, useRef, useState } from "react";
import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";

export default function ToastMessage({ toast }: { toast: Toast }) {
    const { handleClose, navigateToChat } = useToast();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const startRemoveTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            handleClose(toast.id ?? '');
        }, 4000);
    };

    const clearRemoveTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (!isHovered) {
            startRemoveTimer();
        }

        return () => {
            clearRemoveTimer();
        };
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
        clearRemoveTimer();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        startRemoveTimer();
    };

    return (

        <div onClick={() => navigateToChat(toast.id ?? '', toast.sender)} key={toast.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            className={"relative flex flex-col gap-2 w-full min-h-20 max-h-40 bg-white rounded-lg p-2 lg:p-4 shadow-lg outline-1" +
                (toast.type === 'info' ? " outline-gray-600" : "") +
                (toast.type === 'warning' ? " outline-amber-600" : "") +
                (toast.type === 'error' ? " outline-red-600" : "") +
                (toast.type === 'success' ? " outline-green-600" : "")
            }>
            <IconButton type="button" className="absolute top-1 right-1 lg:top-2 lg:right-2 rounded-lg" onClick={(e) => handleClose(toast.id ?? '', e)}>
                <X className="w-5 h-5" />
            </IconButton>
            <div className="flex flex-row gap-2 w-full items-center ">
                {toast.type === 'info' ? <Info className="w-5 h-5 stroke-black" /> : null}
                {toast.type === 'warning' ? <CircleAlert className="w-5 h-5 stroke-amber-600" /> : null}
                {toast.type === 'error' ? <CircleX className="w-5 h-5 stroke-red-600" /> : null}
                {toast.type === 'success' ? <CircleCheck className="w-5 h-5 stroke-green-600" /> : null}
                <p className={"text-semibold" +
                    (toast.type === 'info' ? " text-black" : "") +
                    (toast.type === 'warning' ? " text-amber-600" : "") +
                    (toast.type === 'error' ? " text-red-600" : "") +
                    (toast.type === 'success' ? " text-green-600" : "")
                }>{toast.title}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {toast.sender ?
                    <NavigationElement user={toast.sender} isNotification /> :
                    <p>{toast.content}</p>
                }
            </div>
        </div>
    )
}