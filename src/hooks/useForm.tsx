import { useState } from "react";

export function useForm<T>(initialState: T) {

    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    }

    const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }
    return { values, handleInputChange, reset, setValues };
}