import { useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setFirstName, setLastName } from "@/lib/redux/slices/formDataSlice";

interface CreateChatFormProps {
    isLoading: boolean;
    sendRequest: () => void;
    title: string;
    buttonName: string;
}

export default function FullNameForm({ isLoading, sendRequest, title, buttonName }: CreateChatFormProps) {
    const firstName = useSelector((state: any) => state.formData.firstName);
    const lastName = useSelector((state: any) => state.formData.lastName);
    const dispatch = useDispatch();
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (firstName.trim() === '') {
            setFirstNameError('First name is required');
            return;
        }
        setFirstNameError('');

        if (lastName.trim() === '') {
            setLastNameError('Last name is required');
            return;
        }
        setLastNameError('');
        sendRequest();
    }

    return (
        <>
            <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-center text-xl">{title}</h1>
            </div>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                <CustomInput label="First Name" fieldError={firstNameError} value={firstName}
                    onChange={(e) => dispatch(setFirstName(e.target.value))} placeholder="Enter first name" disabled={isLoading} />

                <CustomInput label="Last Name" fieldError={lastNameError} value={lastName}
                    onChange={(e) => dispatch(setLastName(e.target.value))} placeholder="Enter last name" disabled={isLoading} />

                <div className="flex flex-row w-full justify-end">
                    <CustomButton type="submit" className="py-2 px-4 w-[150px]">
                        {buttonName}
                    </CustomButton>
                </div>
            </form>
        </>
    )
}