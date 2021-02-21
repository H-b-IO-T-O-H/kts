import React from "react";
import "./Error.scss"

type Props = {
    content: string;
    displayed: boolean;
}

const Error: React.FC<Props> = ({content, displayed}) => {
    return (
        <div className="Error">
            {displayed ? <div className="Error__content text-center">
                <div>{content}</div>
            </div> : null}
        </div>
    )
}

export default Error