import React from "react";
import "./ButtonTimetable.scss"

type Props = {
    id: string,
    onChange?: any,
    disabled?: boolean,
    color: string
    title?: string
}

const ButtonTimetable: React.FC<Props> = ({id, onChange, disabled, color, title, children}) => {
    return (
        <button key={id} className="btn-custom" type="button"
                disabled={disabled}
                onClick={() => {
                    onChange(id)
                }}
                style={{background: color}}>
            {title ? <span className="btn-custom__title">{title}</span> : children}
        </button>
    )
}

export default ButtonTimetable;