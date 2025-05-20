interface CustomButtonProps {
    children: React.ReactNode;
    className?: string;
    type: "submit" | "button";
    onClick?: () => void;
    disabled?: boolean;
}

export default function CustomButton({ children, className, ...props }: CustomButtonProps) {
    return (
        <>
            <button className={`text-cyan-500 font-semibold border-2 border-gray-200 rounded-xl px-2 bg-white hover:bg-gray-100 transition-all duration-100 ${className}`} {...props}>
                {children}
            </button>
        </>
    )
}