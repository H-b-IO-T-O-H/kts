import React from "react";

type Props = {
    disabled: boolean,
    title?: string
}

const HiddenInput: React.FC<Props> = ({disabled, title}) => {
    return (
        <div className="hidden d-flex flex-column">
            {title && !disabled ? <small className="hidden__title">{title}</small> : null}
            <textarea className="hidden__text" disabled={disabled}/>
        </div>
    )
}

export default HiddenInput;