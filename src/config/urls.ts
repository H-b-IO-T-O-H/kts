//export const DOMAIN = "http://localhost:8080/api/v1/";

export const DOMAIN = "http://10-tka.ru:8080/api/v1/";
export const ADD_USER = "users/create"
export const LOGIN = "users/login";
export const LOGOUT = "users/logout";
export const ME = "users/me"

const BASE_URL = "/";
const ANY_URL = "*";
const USER_URL = `${BASE_URL}users`;
const TIMETABLE_URL = `${BASE_URL}timetable`;
const AUTH_URL = `${BASE_URL}auth`;
const PANEL_URL = `${BASE_URL}panel`;
const POST_URL = `${BASE_URL}posts`
const FEED_URL = `${BASE_URL}feed`

export const Urls = {
    root: BASE_URL,
    user: {
        slugRoot: USER_URL,
        slugMe: `${USER_URL}/me`
    },
    feed: {
        slugRoot: FEED_URL
    },
    timetable: {
        slugRoot: TIMETABLE_URL,
        slugEdit: `${TIMETABLE_URL}/edit`,
        get: (group: string, week: number) => `${DOMAIN}timetable/${group}/${week}`,
        post: () => `${TIMETABLE_URL}/create`,
        delete: () => `${TIMETABLE_URL}/`
    },
    panel: {
        slugRoot: PANEL_URL,
        getUsersAll: (userType: string) => (`${DOMAIN}users/${userType}/all`)
    },
    post: {
        slugRoot: POST_URL,
        slugCreate: `${POST_URL}/create`
    },
    auth: AUTH_URL,
    notFound: ANY_URL,
}