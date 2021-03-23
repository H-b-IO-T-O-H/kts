import React from "react";
import "./UsersControl.scss"
import InputNumber from "@components/InputNumber";

//     placeholder="Имя"
// <p>{`Iu10-${1}`}</p>

const UsersControl = () => {
    //const [name, changeName] = React.useState("")
    const [userType, setUserType] = React.useState("Студент")
    const [sem, setSem] = React.useState(NaN)
    const [group, setGroup] = React.useState(NaN)
    const [tags, changeTags] = React.useState<Array<React.ReactNode>>([])
    const [inp, setInp] = React.useState("")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInp(e.target.value)
    }

    const handleUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserType(e.target.value)
    }
    const handleSem = (id: string, nmb: number) => {
        setSem(nmb)
    }
    const handleGroup = (id: string, nmb: number) => {
        setGroup(nmb)
    }

    const addTag = () => {
        const tagsOld = [...tags]
        tagsOld.push(<div className="tag mt-1" key={tagsOld.length}>{inp}</div>)
        changeTags(tagsOld)
        setInp("")
    }

    const groupInfo = () => {
        if (!isNaN(sem) && !isNaN(group)) {
            return (
                <div className="IU mt-4">{`ИУ10-${sem}${group}`}</div>)
        }
        return null;
    }

    const defineRole = () => {
        if (userType === "Студент") {
            return (
                <div>
                    <div className="d-flex justify-content-center">
                        <div className="student-sem mr-2">
                            <div>Семестр</div>
                            <InputNumber placeholder={"Сем"} onChange={handleSem} id={"0"} min={1} max={12}/>
                        </div>
                        <div className="student-group mr-2">
                            <div>Группа</div>
                            <InputNumber placeholder={"Группа"} onChange={handleGroup} id={"1"} min={1} max={5}/>
                        </div>
                        {groupInfo()}
                    </div>
                    <div className="student-phone">
                        <div>Телефон</div>
                        <input className="student-phone_input"/>
                    </div>
                    <div className="student-email">
                        <div>Email</div>
                        <input className="student-email_input"/>
                    </div>
                </div>
            )
        } else if (userType === "Преподаватель") {
            return (
                <div>
                    <div>
                        <div>{tags}</div>
                        <input value={inp} onChange={handleInput} type="text" className="Lesson mt-2"
                               placeholder="Дисциплина"/>
                        <button type="button" onClick={addTag} className="add text-center">+</button>
                    </div>
                    <div className="prof-info mt-2">
                        <input placeholder="О себе" className="prof-info_input"/>
                    </div>
                    <div className="prof-phone">
                        <div>Телефон</div>
                        <input className="prof-phone_input"/>
                    </div>
                    <div className="prof-email">
                        <div>Email</div>
                        <input className="prof-email_input"/>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="met-info mt-2">
                    <input placeholder="О себе" className="met-info_input"/>
                </div>
                <div className="met-email">
                    <div>Email</div>
                    <input className="met-email_input"/>
                </div>
            </div>
        );
    }

    return (
        <form className="users-control">
            <div className="users-control_surname">
                <div>Фамилия</div>
                <input className="form-control_surname"/>
            </div>
            <div className="users-control_name">
                <div>Имя</div>
                <input className="form-control_name"/>
            </div>
            <div className="users-control_patronymic">
                <div>Отчество</div>
                <input className="form-control_patronymic"/>
            </div>
            <div className="users-control_roles">
                <div>Тип пользователя</div>
                <select value={userType} onChange={handleUserType} className="form-control_roles">
                    <option>Студент</option>
                    <option>Преподаватель</option>
                    <option>Методист</option>
                </select>
            </div>
            {defineRole()}
            <button type="button" className="btn users-control_load mt-2">Сохранить</button>
        </form>
    )
}

export default UsersControl;