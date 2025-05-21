'use client'

import { Toast } from "@/lib/redux/types/Toast";
import useToast from "@/hooks/useToast";
import ToastMessage from "./ui/ToastMessage";
import { useDispatch } from "react-redux";
import { clearToasts } from "@/lib/redux/slices/appSlice";

export default function ToastList() {
    const { toastStack } = useToast();
    const dispatch = useDispatch();

    return (
        <>
            <div className="hidden sm:flex flex-col items-end justify-end absolute left-5 bottom-5 w-96 gap-3 text-black">
                {toastStack.map((toast: Toast) => {
                    return <ToastMessage key={toast.id} toast={toast} />
                })}
                {toastStack.length > 0 &&
                    <button type="button" onClick={() => dispatch(clearToasts())}
                        className="flex flex-row items-center justify-center w-full p-2 gap-2 hover:bg-gray-200
                         bg-white rounded-lg outline-1 outline-gray-500 transition-all duration-100">
                        {`Close All (${toastStack.length})`}
                    </button>
                }
            </div>
            <div className="flex sm:hidden flex-col items-center absolute top-5 w-full px-3 gap-2 text-black">
                {toastStack.length > 0 && <ToastMessage toast={toastStack[0]} />}
            </div>
        </>
    );
}