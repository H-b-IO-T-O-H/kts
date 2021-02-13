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
    const [value, setValue] = useState("")

    const changeInputValue = useCallback((e: any) => {
        let inputValue = parseInt(e.target.value);
        if (inputValue < min || inputValue > max) {
            return;
        }
        setValue(e.target.value);
        if (onChange) {
            onChange(id, inputValue);
        }
    }, [onChange, id, min, max])

    return (
        <input type="number" placeholder={placeholder} className="input-number" value={value} onChange={(e) => {changeInputValue(e)}}/>
    );

}

export default InputNumber;