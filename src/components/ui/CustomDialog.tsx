import { X } from "lucide-react";

export default function CreateChatDialog({ isOpen, handleClose, children }: { isOpen: boolean, handleClose: () => void, children: React.ReactNode }) {
    return (
        <>
            <div onClick={handleClose} className={"absolute left-0 top-0 w-screen h-screen p-4 flex items-center justify-center bg-black/50 z-50 transition-all duration-200" + (isOpen ? " opacity-100 pointer-events-auto " : " opacity-0 pointer-events-none ")}>
                <div onClick={(e) => e.stopPropagation()} className="relative flex flex-col items-start justify-center p-4 gap-2 rounded-xl bg-white w-[500px]">
                    <button type="button" onClick={handleClose} className="absolute right-4 top-3 hover:bg-gray-200 transition-all duration-100 p-2 rounded-lg">
                        <X/>
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
}