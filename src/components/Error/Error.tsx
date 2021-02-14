import React from "react";
import "./Error.scss"

type Props = {
    content: string;
    displayed: boolean;
}

const Error: React.FC<Props> = ({content, displayed}) => {
    return(
        <div className="Error text-center">
            {displayed? <div>...</div> :
                null}
            <p>{content}</p>
        </div>
    )
}

export default Error