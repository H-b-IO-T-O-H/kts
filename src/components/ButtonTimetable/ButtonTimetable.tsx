import React from "react";
import "./ButtonTimetable.scss"

type Props = {
    id: string,
    onChange: any,
    disabled: boolean,
    color: string
    title: string
}

const ButtonTimetable: React.FC<Props> = ({id, onChange, disabled, color, title}) => {
    return (
        <button id={id} className="btn-custom" type="button"
                disabled={disabled}
                onClick={() => {
                    onChange(id)
                }}
                style={{background: color}}>
            <span className="btn-custom__title">{title}</span>
        </button>
    )
}

export default ButtonTimetable;