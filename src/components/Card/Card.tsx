import React from "react";
import "./Card.scss";

type Props = {
    title: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
}

const Card: React.FC<Props> = ({title, item1,item2,item3,item4}) => {
    return(
        <div className="card Home-Card">
                <h5 className="card-title Home-Card__title">{title}</h5>
                <ul className="list-group Home-Card__list">
                    <li className="list-group-item Home-Card-list__item">{item1}</li>
                    <li className="list-group-item Home-Card-list__item">{item2}</li>
                    <li className="list-group-item Home-Card-list__item">{item3}</li>
                    <li className="list-group-item Home-Card-list__item">{item4}</li>
                </ul>
        </div>
    )
}

export default Card;