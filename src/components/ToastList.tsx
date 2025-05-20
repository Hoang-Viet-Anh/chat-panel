'use client'

import { Toast } from "@/lib/redux/types/Toast";
import useToast from "@/hooks/useToast";
import ToastMessage from "./ui/ToastMessage";

export default function ToastList() {
    const { toastStack } = useToast();

    return (
        <>
            <div className="flex flex-col items-end justify-end absolute left-5 bottom-5 w-96 gap-3 text-black">
                {toastStack.map((toast: Toast) => {
                    return <ToastMessage key={toast.id} toast={toast} />
                })}
            </div>
        </>
    );
}