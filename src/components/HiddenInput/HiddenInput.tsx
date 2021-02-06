import React from "react";

type Props = {
    disabled: boolean,
    title?: string
}

const HiddenInput: React.FC<Props> = ({disabled, title}) => {
    return (
        <div className="d-flex flex-column">
            {title && !disabled ? <small>{title}</small> : null}
            <textarea className="form-control" disabled={disabled}/>
        </div>
    )
}

export default HiddenInput;