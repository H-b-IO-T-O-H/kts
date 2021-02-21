import React from "react";
import "./Card.scss";

type Props = {
    id: number;
    title: string;
    currentDay: number;
    items: React.ReactNode[];
}

const Card: React.FC<Props> = ({id, title, currentDay, items}) => {
    return (
        <div className="Home-Card">
            <h5 className="Home-Card__title"
                style={{backgroundColor: id < currentDay ? "#b4bdbd" : "#5bc3c3"}}>{title}</h5>
            <ul className="list-group Home-Card__list">
                {items.map((elem, index) => (
                    <li key={index} className="list-group-item Home-Card-list__item">{elem}</li>))}
            </ul>
        </div>
    )
}

export default Card;