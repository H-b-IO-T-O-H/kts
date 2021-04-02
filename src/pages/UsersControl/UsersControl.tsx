import React, {useCallback, useState} from "react";
import "./UsersControl.scss"
import InputNumber from "@components/InputNumber";
import Tags from "@components/Tags";
import StatusLabel from "@components/StatusLabel";
import {btnPasswd, saveUser} from "./config";
import {engRusMap} from "@utils/en-ru-map";
import ButtonTimetable from "@components/ButtonTimetable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt} from "@fortawesome/free-solid-svg-icons/faRedoAlt";
import UsersTable from "./usersTables";

const UsersControl = () => {
    //const [name, changeName] = React.useState("")
    const [err, showLabel] = useState({content: "", success: false});
    const [userInfo, setUserInfo] = useState({
        "role": "",
        "email": "",
        "name": "",
        "surname": "",
        "patronymic": "",
        "password": "",
        "group": ""
    });
    const [passwd, setPasswd] = useState("")

    const [userType, setUserType] = useState("Студент");
    const [sem, setSem] = useState(NaN);
    const [group, setGroup] = useState(NaN);

    const handleUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserType(e.target.value);
    }
    const handleSem = (id: string, nmb: number) => {
        setSem(nmb);
    }
    const handleGroup = (id: string, nmb: number) => {
        setGroup(nmb);
    }


    const handleSubmit = useCallback(() => {
        const newUser = {
            "role": engRusMap[userType],
            "email": userInfo.email,
            "name": userInfo.name,
            "surname": userInfo.surname,
            "patronymic": userInfo.patronymic,
            "password": userInfo.password,
            "group": `IU10-${sem}${group}`
        }
        saveUser(newUser, showLabel)
    }, [userInfo])

    const groupInfo = () => {
        if (!isNaN(sem) && !isNaN(group)) {
            return (
                <div className="IU">{`Группа: ИУ10-${sem}${group}`}</div>)
        }
        return null;
    }

    const defineRole = () => {
        if (userType === "Студент") {
            return (
                <div>
                    <div className="d-flex justify-content-center">
                        <div className="mr-1">
                            <InputNumber placeholder={"Сем"} onChange={handleSem} id={"0"} min={1} max={12}/>
                        </div>
                        <div className="ml-1">
                            <InputNumber placeholder={"Группа"} onChange={handleGroup} id={"1"} min={1} max={5}/>
                        </div>
                    </div>
                    {groupInfo()}
                </div>
            )
        } else if (userType === "Преподаватель") {
            return (
                <div>
                    <Tags placeholder={"Дисциплина"} />
                    <div className="prof-info mt-2">
                        <input placeholder="О себе" className="users-control_input"/>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <StatusLabel info={err}/>
            <div className="users">
                <div className="users-control">
                    <div className="panel__header">
                        Добавление пользователей
                    </div>
                    <div className="users-control_block">
                        <div className="mt-1">
                            <div className="users-control_label">Фамилия</div>
                            <input className="users-control_input"/>
                        </div>
                        <div className="mt-1">
                            <div className="users-control_label">Имя</div>
                            <input className="users-control_input"/>
                        </div>
                        <div className="mt-1">
                            <div className="users-control_label">Отчество</div>
                            <input className="users-control_input"/>
                        </div>
                        <div className="mt-3 mb-2">
                            <div className="users-control_label">Тип пользователя</div>
                            <select value={userType} onChange={handleUserType} className="users-control_select">
                                <option>Студент</option>
                                <option>Преподаватель</option>
                                <option>Методист</option>
                            </select>
                        </div>
                        {defineRole()}
                        <div className="mt-1">
                            <div className="users-control_label">Телефон</div>
                            <input className="users-control_input"/>
                        </div>
                        <div className="mt-1">
                            <div className="users-control_label">Email</div>
                            <input className="users-control_input"/>
                        </div>
                        <div className="mt-1">
                            <div className="users-control_label">Пароль</div>
                            <div className="d-flex flex-row align-items-center">
                                <input value={passwd} disabled={true} className="users-control_input"/>
                                <button type="button" onClick={() => {
                                    setPasswd(btnPasswd.genPasswd(15));
                                }} className="add ml-1"><FontAwesomeIcon className="icon-reload" icon={faRedoAlt}
                                                                         size={"sm"}
                                                                         color={"#ffffff"}/></button>
                            </div>
                        </div>
                        <button type="button" className="btn users-control_load mt-3 mb-3"
                                onClick={handleSubmit}>Сохранить
                        </button>
                    </div>
                </div>
                    <UsersTable id={1} items={[]} title={"Список преподавателей"}/>

            </div>
        </div>
    )
}

export default UsersControl;
