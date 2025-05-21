interface MenuDrawerProps {
    isOpen: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}


export default function MenuDrawer({ isOpen, handleClose, children }: MenuDrawerProps) {
    return (
        <>
            <div onClick={handleClose} className={"absolute top-0 left-0 z-10 h-screen w-screen bg-black/50 lg:hidden transition-all duration-200" +
                (isOpen ? " opacity-100 pointer-events-auto " : " opacity-0 pointer-events-none ")}>
                <div onClick={(e) => e.stopPropagation()}
                    className={"flex flex-col items-start bg-white h-screen overflow-hidden transition-all duration-200 ease-in-out " +
                        (isOpen ? "w-2xs sm:w-96" : "w-0")
                    }>
                    <div
                        className={
                            "flex flex-col items-start justify-center py-4 px-3 gap-2 w-full transition-opacity duration-100 ease-out " +
                            (isOpen ? "opacity-100" : "opacity-0")
                        }
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}