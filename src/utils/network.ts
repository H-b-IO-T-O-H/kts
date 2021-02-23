import axios from "axios";

export const makeGet = async (url: string) => {
    return axios({
        method: "get",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        withCredentials: true,
        url: url
    });
};

export const makePost = async (url: string, data: any) => {
    return axios({
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        url: url,
        data: data,
        withCredentials: true
    });
};

export const makeDelete = async (url: string, data: any) => {
    return axios({
        method: "delete",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        url: url,
        data: data,
        withCredentials: true
    });
};

// const makeRequest = async () => {
//     axios({
//         method: "get",
//         url: "https://api.github.com/users"
//     }).then(response => {
//         setUsers(response.data.reduce((acc, user) => [...acc, {
//             id: user.id,
//             name: user.login,
//             avatarUrl: user.avatar_url
//         }], []))
//     });
// }
