import React from "react";
import "./HiddenInput.scss"

type Props = {
    value: string,
    onChange: (s: string, id: string) => void,
    id: string,
    disabled: boolean,
    title?: string
    buttonId?: string,
}

const HiddenInput: React.FC<Props> = ({id, disabled, title, onChange, value}) => {
    const HandleChange = React.useCallback((value: string, id: string) => {
        onChange(value, id);
    }, [onChange]);

    return (
        <div key={id} className="hidden d-flex flex-column text-black-50">
            <textarea value={value} onChange={e => {
                HandleChange(e.target.value, id)
            }} placeholder={title && !disabled ? title : ""}
                      className="hidden__text"
                      style={{display: disabled ? "none" : ""}}/>
        </div>
    )
}

export default HiddenInput;