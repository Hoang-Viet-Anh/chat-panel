'use client'

import { useSelector } from "react-redux";
import CustomButton from "../ui/CustomButton";
import CreateChatDialog from "../ui/CustomDialog";
import { useRouter } from "next/navigation";
import { CircleAlert, UserRound } from "lucide-react";
import { useState } from "react";
import { useGetMeQuery } from "@/lib/redux/api/chatApi";

const url = process.env.NEXT_PUBLIC_API_URL

export default function UserProfile() {
    const userProfile = useSelector((state: any) => state.app.userProfile);
    const [open, setOpen] = useState(false);
    const { isLoading } = useGetMeQuery();
    const router = useRouter();

    const isAuthorized = userProfile?.googleId != undefined;

    const handleOpen = () => {
        if (isAuthorized) {
            router.push(`${url}/auth/logout`);
            return;
        }
        setOpen(true);
    }

    return (
        <>
            <div className="flex flex-row justify-between items-center w-full p-4 bg-gray-100">
                <div className="flex flex-row items-center gap-3">
                    {isAuthorized ?
                        <img src={userProfile?.imageUrl} alt="user avatar" className="w-10 rounded-full bg-white" referrerPolicy="no-referrer" />
                        :
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                            <UserRound />
                        </div>
                    }
                    <p className="w-[200px] overflow-hidden truncate">
                        {isAuthorized ?
                            `${userProfile?.firstName} ${userProfile?.lastName}`
                            :
                            userProfile?.firstName}
                    </p>
                </div>
                {isLoading ?
                    <div className="w-20 h-7 bg-gray-300 rounded-lg animate-pulse" />
                    :
                    <CustomButton type="button" className={isAuthorized ? "border-red-500 text-red-500 w-20" : "w-20"} onClick={handleOpen}>
                        {isAuthorized ? 'Log out' : 'Log in'}
                    </CustomButton>}
            </div>
            <CreateChatDialog isOpen={open} handleClose={() => setOpen(false)}>
                <div className="flex flex-col items-center justify-center w-full h-full pt-5">
                    <p className="text-xl font-semibold">Log in</p>
                    <div className="border-b-2 border-gray-300 w-full my-4" />
                    <CustomButton type="button" className="flex flex-row items-center w-full gap-3 justify-center p-2 " onClick={() => router.push(`${url}/auth/google`)} >
                        <img src="/google.svg" height={24} width={24} alt="google icon" />
                        <p className="text-sm text-black">Continue with Google</p>
                    </CustomButton>
                    <div className="border-b-2 border-gray-300 w-full my-4" />
                    <div className="flex flex-row items-start justify-center w-full gap-3">
                        <CircleAlert />
                        <p className="text-sm ">
                            <strong>Note:</strong> After login, all chats related to your account will be loaded if they exist.
                        </p>
                    </div>
                </div>
            </CreateChatDialog>
        </>
    );
} 