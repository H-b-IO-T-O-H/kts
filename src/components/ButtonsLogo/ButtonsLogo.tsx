import React from "react";
import "./ButtonsLogo.scss"

type Props = {
    color: string
}

const ButtonsLogo: React.FC<Props> = ({color, children}) => {
    return (
        <div className="btn-logo" style={{backgroundColor: color}}>
            {children}
        </div>
    )
}

export default ButtonsLogo;