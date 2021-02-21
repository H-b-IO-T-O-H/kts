const BASE_URL = "/";
const TIMETABLE_URL = `${BASE_URL}timetable`;
const AUTH_URL = `${BASE_URL}auth`;
const ANY_URL = "*"

export const Urls = {
    root: BASE_URL,
    timetable: {
        new:`${TIMETABLE_URL}/new`,
        //byId:`${TIMETABLE_URL}[:id]`,
        byId:`${TIMETABLE_URL}`,
        create:(id:string)=>`${TIMETABLE_URL}/${id}`
    },
    auth: AUTH_URL,
    notFound: ANY_URL,
}