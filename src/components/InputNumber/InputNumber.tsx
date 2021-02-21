import React, {useCallback, useState} from "react";
import "./InputNumber.scss"

type Props = {
    placeholder: string;
    id: string;
    min: number;
    max: number;
    onChange?: (id: string, value: number) => void;
}

const InputNumber: React.FC<Props> = ({id, min, max, onChange, placeholder}) => {
    const [value, setValue] = useState(0)

    const changeInputValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = parseInt(e.target.value);
        if (inputValue < min || inputValue > max) {
            return;
        }
        setValue(inputValue);
        if (onChange) {
            onChange(id, inputValue);
        }
    }, [onChange, id, min, max])

    return (
        <input type="number" placeholder={placeholder} className="input-number" value={value}
               onChange={changeInputValue}/>
    );

}

export default InputNumber;