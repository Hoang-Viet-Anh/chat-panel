import { setFirstName, setLastName } from "@/lib/redux/slices/formDataSlice";
import { SetStateAction } from "react";
import { useDispatch } from "react-redux";

const useAddBot = () => {
    const dispatch = useDispatch();

    const handleOpen = (setOpen: (value: SetStateAction<boolean>) => void, firstName?: string, lastName?: string) => {
        dispatch(setFirstName(firstName ?? ''));
        dispatch(setLastName(lastName ?? ''));
        setOpen(true);
    }

    const handleClose = (isLoading: boolean, setOpen: (value: SetStateAction<boolean>) => void) => {
        if (isLoading) {
            return;
        }
        setOpen(false);
    }

    return { handleClose, handleOpen };
}

export default useAddBot;