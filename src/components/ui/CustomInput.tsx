type CustomInputProps = {
    fieldError?: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    disabled?: boolean;
    type?: string;
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({fieldError, label, ...props}: CustomInputProps) {
    return (
        <>
            <div className="flex flex-col w-full">
                <label htmlFor={label} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
                <input
                    id={label}
                    name={label}
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
                    {...props}
                />
            </div>
            <p className="text-sm text-red-500">{fieldError}</p>
        </>
    )
}