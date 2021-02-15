import React from "react";
import "./Lesson.scss"

type Props = {
    title: string;
    time: string,
    auditorium: string,
    icon?: JSX.Element,
}

const Lesson: React.FC<Props> = ({title, time, auditorium, children}) => {
    return (
        <div className="Lesson">
            <div className="Lesson__header">
                <span className="Lesson__header__text">
                    {title}</span>
            </div>
            {children}
            <div className="d-flex flex-row justify-content-between">
                <div className="Lesson__param">{time}</div>
                <div className="Lesson__param">{auditorium}</div>
            </div>
        </div>
    )
}

export default Lesson;