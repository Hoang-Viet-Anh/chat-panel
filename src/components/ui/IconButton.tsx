interface IconButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (e?: any) => void;
    type: "button" | "submit";
    disabled?: boolean;
}

export default function IconButton({ children, className, ...props }: IconButtonProps) {
    return (
        <button className={`hover:bg-gray-200 transition-all duration-100 p-2 disabled:hover:bg-inherit disabled:opacity-25 ${className}`} {...props}>
            {children}
        </button>
    );
}