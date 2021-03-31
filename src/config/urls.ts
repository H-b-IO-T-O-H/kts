export const DOMAIN = "http://localhost:8080/api/v1/";
//export const DOMAIN = "https://10-tka.pp.ua:8080/api/v1/"

//export const DOMAIN = "http://10-tka.ru:8080/api/v1/";
export const ADD_USER = "users/create"
export const LOGIN = "users/login";
export const LOGOUT = "users/logout";
export const ME = "users/me"

const BASE_URL = "/";
export const TIMETABLE_URL = `${BASE_URL}timetable`;
const AUTH_URL = `${BASE_URL}auth`;
const ANY_URL = "*";
const PANEL_URL = `${BASE_URL}panel`;

export const Urls = {
    root: BASE_URL,
    timetable: {
        slugEdit: `${TIMETABLE_URL}/edit`,
        slugRoot: `${TIMETABLE_URL}`,
        get: (group: string, week: number): string => `${DOMAIN}timetable/${group}/${week}`,
        post: () => `${DOMAIN}timetable/create`,
        delete: () => `${DOMAIN}timetable/`
    },
    panel: {
        slugRoot: `${PANEL_URL}`
    },
    auth: AUTH_URL,
    notFound: ANY_URL,
}