import generatePassword from "password-generator";

export const btnPasswd =
    {
        id: "btn-passwd-generator",
        title: "+",
        color: "#4db6ac",
        genPasswd: (len: number) => (generatePassword(len, false,/[\w\d?-]/))
    }

export const saveUser = (userInfo: object, showLabel: any) => {
    showLabel({content: "a", success: false});
}
