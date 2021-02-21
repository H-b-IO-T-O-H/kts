import React from "react";

import Card from "@components/Card";
import Lesson from "@components/Lesson";
import ButtonsLogo from "@components/ButtonsLogo";

import "./Home.scss"

const getWeekData = (): [number, string[]] => {
    const date = new Date();
    const today = date.getDate();
    const weekDay = (date.getDay() + 6) % 7;
    const weekAgo = weekDay === 6 ? today - 6 : today;

    const monthIdx = date.getMonth();
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const months = ["января", "февраля", "март", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    return [weekDay, days.map((day, index) => (`${day}, ${weekAgo + index} ${months[monthIdx]}`))]
}

const Items: React.ReactNode[] = [
    <Lesson title="ТОТР" auditorium="404" time="8:30 - 10:05"><ButtonsLogo xs idx={0}/></Lesson>,
    <Lesson title="ТОТР" auditorium="404" time="8:30 - 10:05"><ButtonsLogo xs idx={1}/></Lesson>,
    <Lesson title="ТОТР" auditorium="404" time="8:30 - 10:05"><ButtonsLogo xs idx={2}/></Lesson>,
    <Lesson title="ТОТР" auditorium="404" time="8:30 - 10:05"><ButtonsLogo xs idx={3}/></Lesson>,
    <Lesson title="ТОТР" auditorium="404" time="8:30 - 10:05"><ButtonsLogo xs idx={4}/></Lesson>,
    <Lesson title="ТОТР" auditorium="404" time="8:30 - 10:05"><ButtonsLogo xs idx={5}/></Lesson>,
    <Lesson title="ТОТР" auditorium="404" time="8:30 - 10:05"><ButtonsLogo xs idx={6}/></Lesson>,
    <Lesson title="ТОТР" auditorium="404" time="8:30 - 10:05"><ButtonsLogo xs idx={7}/></Lesson>,
]

const Home = () => {
    const [weekDay, weekData] = getWeekData();
    return (
        <div>
            <div className="Home d-flex flex-row flex-nowrap">
                {weekData.map((date, index) => (
                    <Card id={index} key={index} currentDay={weekDay} title={date} items={Items}/>
                ))}
            </div>
        </div>
    )
}

export default React.memo(Home);