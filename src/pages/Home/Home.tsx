import React, {useEffect, useState} from "react";

import Card from "@components/Card";
import Lesson from "@components/Lesson";
import ButtonsLogo from "@components/ButtonsLogo";

import "./Home.scss"
import {makeGet} from "@utils/network";
import {Urls} from "@config/urls";
import {Labels} from "@components/DragAndDrop/config";
import {LessonsTime} from "@config/config";

const getWeekData = (): [number, string[]] => {
    const date = new Date();
    const today = date.getDate();
    const weekDay = (date.getDay() + 6) % 7;
    const weekAgo = today - weekDay;

    const monthIdx = date.getMonth();
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const months = ["января", "февраля", "март", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    return [weekDay, days.map((day, index) => (`${day}, ${weekAgo + index} ${months[monthIdx]}`))]
}

type LessonType = {
    lesson_id: string;
    title: string;
    lesson_type: string;
    auditorium: string;
}

const prepareLessons = (lessons: Array<LessonType>) => {
    return lessons.map((lesson, index) => (
        <Lesson title={lesson.title} auditorium={lesson.auditorium} time={LessonsTime[index]}
                isEmpty={lesson.lesson_type === "free"}>
            <ButtonsLogo xs idx={Labels[lesson.lesson_type]}/>
        </Lesson>
    ))
};

const prepareWeek = (weekDays: Array<{ day_id: string, day_order: number, lessons: Array<LessonType> }>) => {
    const newList: Array<Array<React.ReactNode>> = [];

    weekDays.map((day, index) => {
        if (day.lessons) {
            newList[index] = prepareLessons(day.lessons)
        } else {
            newList[index] = []
        }
    })
    return newList
}

const Home = () => {
    const [weekDay, weekData] = getWeekData();
    const [lessons, changeLessons] = useState<Array<Array<React.ReactNode>>>([])

    useEffect(() => {
        makeGet(Urls.timetable.get("IU10-73", 1)).then((response) => {
            console.log("Ответ сервера успешно получен!");
            const savedWeek = prepareWeek(response.data.week.days)
            changeLessons(savedWeek)

        }).catch((error) => {
            console.log(error)
            return;
        });
    }, [])

    return (
        <div>
            <div className="Home d-flex flex-row flex-nowrap">
                {weekData.map((date, index) => (
                    <Card id={index} key={index} currentDay={weekDay} title={date} items={lessons[index]}/>
                ))}
            </div>
        </div>
    )
}

export default React.memo(Home);