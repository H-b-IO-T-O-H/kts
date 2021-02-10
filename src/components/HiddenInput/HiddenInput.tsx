import React from "react";
import "./HiddenInput.scss"

type Props = {
    value: string,
    onChange: any,
    id: string,
    disabled: boolean,
    title?: string
    buttonId?: string,
}

const HiddenInput: React.FC<Props> = ({id, disabled, title, onChange, value}) => {


    const HandleChange = React.useCallback(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <div key={id} className="hidden d-flex flex-column text-black-50">
            <textarea value={value} onChange={HandleChange} placeholder={title && !disabled ? title : ""}
                      className="hidden__text"
                      style={{display: disabled ? "none" : ""}}/>
        </div>
    )
}

export default HiddenInput;