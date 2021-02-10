import React from "react";
import "./HiddenInput.scss"

type Props = {
    id?: string,
    disabled: boolean,
    title?: string
    buttonId?: string,
}

const HiddenInput: React.FC<Props> = ({buttonId, id, disabled, title}) => {
    return (
        <div className="hidden d-flex flex-column text-black-50">
            <textarea placeholder={title && !disabled ? title: ""} className="hidden__text" style={{display: disabled ? "none" : ""}}/>
        </div>
    )
}

export default HiddenInput;