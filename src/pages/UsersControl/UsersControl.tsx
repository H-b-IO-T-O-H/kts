import React from "react";
import "./UsersControl.scss"

//     placeholder="Имя"

const UsersControl = () => {
    //const [name, changeName] = React.useState("")
    const [userType, setUserType] = React.useState("Студент")

    const handleUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserType(e.target.value)
    }

    const defineRole = () => {
        if (userType === "Студент") {
            return (
            <div className="d-flex justify-content-center" >
                <div className="student-sem mr-2">
                <div>Семестр</div>
                <select className="student-sem_select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
                </div>
            <div className="student-group mr-2">
                <div>Группа</div>
                <select className="student-group_select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            </div>
            )
        } else if (userType === "Преподаватель") {
            return <div>2</div>;
        }
        return 3;
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
        </form>
    )
}

export default UsersControl;