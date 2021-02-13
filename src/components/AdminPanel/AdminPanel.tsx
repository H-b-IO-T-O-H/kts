import React from "react";
import "./AdminPanel.scss"
import ButtonTimetable from "@components/ButtonTimetable";
import {v4 as uuid} from "uuid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import InputNumber from "@components/InputNumber";

type Props = {
    dayIdx: number;
    changeDay: () => void;
}

const Week = [
    {id: 0, day: "Пн", date: ""},
    {id: 1, day: "Вт", date: ""},
    {id: 2, day: "Ср", date: ""},
    {id: 3, day: "Чт", date: ""},
    {id: 4, day: "Пт", date: ""},
    {id: 5, day: "Сб", date: ""},
    {id: 6, day: "Вс", date: ""},
]


const AdminPanel: React.FC<Props> = ({dayIdx, changeDay}) => {
    const [panelLabel, setLabel] = React.useState("")
    const [groupInfo, setInfo] = React.useState({Week: 0, Group: 0, Semester: 0, WeekType: "Чс"})

    const changeLabelInfo = React.useCallback((id, value) => {
        const newInfo = groupInfo;
        switch (id) {
            case "input-for-week":
                newInfo.Week = value;
                break;
            case "input-for-group":
                newInfo.Group = value;
                break;
            case "input-for-sem":
                newInfo.Semester = value;
                break;
            case "input-for-week-type":
                newInfo.WeekType = value;
                break;
        }
        if (newInfo.Week !== 0 && !isNaN(newInfo.Week) && newInfo.WeekType !== "" && newInfo.Semester !== 0 && !isNaN(newInfo.Semester) && newInfo.Group !== 0 && !isNaN(newInfo.Group)) {
            const newLabel = `${newInfo.Week} Неделя, ${newInfo.WeekType}, Группа ИУ10-${newInfo.Semester}${newInfo.Group}`
            setLabel(newLabel)
        } else {
            setLabel("");
        }
        setInfo(newInfo);
    }, [groupInfo])

    return (
        <div>
            <div className="panel">
                {dayIdx !== -1 ?
                    <ButtonTimetable
                        onChange={changeDay}
                        disabled={false}
                        btn={{id: uuid(), color: "#4fbfb4"}}
                    >
                        <div className="d-flex flex-row flex-nowrap justify-content-around">
                            <FontAwesomeIcon icon={faPlus} size={"lg"}
                                             color={"white"}/>
                            <span
                                className="DAndD-container__header__text_white">{Week[dayIdx].day}</span>
                        </div>
                    </ButtonTimetable>
                    : null}
                <InputNumber placeholder="Неделя" id="input-for-week" min={1} max={17} onChange={changeLabelInfo}/>
                <InputNumber placeholder="Группа" id="input-for-group" min={1} max={5} onChange={changeLabelInfo}/>
                <InputNumber placeholder="Семестр" id="input-for-sem" min={1} max={12} onChange={changeLabelInfo}/>
                <select id="input-for-week-type" defaultValue={"1"} className="panel__select" onChange={(e) => {
                    changeLabelInfo("input-for-week-type", e.target.value)
                }}>
                    <option value="Чс">Чс</option>
                    <option value="Зн">Зн</option>
                </select>
            </div>
            {panelLabel}
        </div>
    )
}

export default AdminPanel;