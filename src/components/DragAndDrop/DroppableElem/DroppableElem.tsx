import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";

import ButtonsLogo from "@components/ButtonsLogo/ButtonsLogo";

type Props = {
    sourceIdx: number;
    header: string;
    footer: string;
}

const DroppableElem: React.FC<Props> = ({sourceIdx, header, footer}) => {
    return (
        <div>
            <div className="DAndD-item__header">
                <span className="DAndD-item__header__text">{header}</span>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <ButtonsLogo idx={sourceIdx}/>
                <div className="DAndD-item__footer mt-1 mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faMapMarkerAlt}/>
                    <span>{footer}</span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(DroppableElem);