import {makePost} from "@utils/network";

export const addUsers = () => {
    const users = [
        {
            "role":"guest",
            "email":"g@g.ru",
            "name":"guest",
            "surname":"guest",
            "patronymic":"guest",
            "password":"12345"
        },
        {
            "role":"admin",
            "email":"a@a.ru",
            "name":"admin",
            "surname":"admin",
            "patronymic":"admin",
            "password":"admin"
        },
        {
            "role":"student",
            "email":"s@s.ru",
            "name":"vasya",
            "surname":"pupkin",
            "patronymic":"alexandrovich",
            "password":"student",
            "group":"IU10-73"
        }
    ]
    users.forEach((u) =>{
        makePost("http://localhost:8080/api/v1/users/create", u);
    })
    //makePost("http://localhost:8080/api/v1/users/create", )
}