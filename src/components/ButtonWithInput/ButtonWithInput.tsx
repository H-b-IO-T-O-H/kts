import React from "react";
import ButtonTimetable from "@components/ButtonTimetable";
import HiddenInput from "@components/HiddenInput";


type Props = {
    defaultValue?: string,
    onInputChange?: (id: string, value: string) => void;
    onBtnChange?: () => void,
    btn: { id: string, title?: string, color: string }
}

const ButtonWithInput: React.FC<Props> = ({btn, onBtnChange, onInputChange, defaultValue}) => {
    const [activeInput, setActive] = React.useState(true);
    const [inputValue, changeValue] = React.useState(defaultValue ? defaultValue : "");

    const changeInputValue = React.useCallback((value: string) => {
        changeValue(value);
        if (onInputChange) {
            onInputChange(btn.id, value);
        }
    }, [onInputChange, btn.id])

    const setActiveInput = React.useCallback(() => {
        setActive(!activeInput);
        if (onBtnChange) {
            onBtnChange();
        }
    }, [onBtnChange, activeInput])

    return (
        <div className="d-flex flex-row align-content-end">
            <ButtonTimetable disabled={false}
                             onChange={setActiveInput}
                             btn={btn}/>
            <div className="m-1">
                <HiddenInput id={btn.id} value={inputValue}
                             onChange={changeInputValue} disabled={activeInput} title={"Описание"}/>
            </div>
        </div>
    )
}

export default ButtonWithInput;