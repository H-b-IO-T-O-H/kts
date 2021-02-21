import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"

import {Urls} from "@config/urls";

import {
    PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH,
    EMPTY_EMAIL_FIELD, EMPTY_PASSWORD_FIELD, ERROR_AUTHORIZATION,
    ERROR_EMAIL_FIELD, ERROR_PASSWORD_FIELD, DEFAULT_SESSION_TIME
} from "./config";
import "./Authorization.scss"
import AuthError from "@components/AuthError";

export const Logout = (history: any) => {
    localStorage.setItem("loginTime", "");
    history.replace(Urls.auth);
}

export const DefaultCheckLogin = () => {
    const lastAuthTime = parseInt(localStorage.getItem("loginTime") as string);
    return lastAuthTime != null && Date.now() - lastAuthTime < DEFAULT_SESSION_TIME;
}

const userPupkin = {
    email: "email@y.ru",
    password: "email@y.ru"
};

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState(EMPTY_EMAIL_FIELD);
    const [passwordError, setPasswordError] = useState(EMPTY_PASSWORD_FIELD);
    const [formValid, setFormValid] = useState(false);
    const [userError, setUserError] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const history = useHistory();

    const CheckBoxHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckBox(e.target.checked);
    }, []);

    const HandleSubmit = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        //TODO: get data from server + checkbox treatment
        if (email !== userPupkin.email || password !== userPupkin.password) {
            setUserError(ERROR_AUTHORIZATION);
            return;
        }
        localStorage.setItem("loginTime", Date.now().toString());
        history.push(Urls.timetable.byId);
    }, [email, password, history]);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    const EmailHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const emailNew = e.target.value;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(emailNew).toLowerCase())) {
            setEmailError(ERROR_EMAIL_FIELD)
        } else setEmailError('');
        setEmail(emailNew);
    }, []);

    const PasswordHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const passwdNew = e.target.value;
        if (passwdNew.length < PASSWORD_MIN_LENGTH || passwdNew.length > PASSWORD_MAX_LENGTH) {
            setPasswordError(ERROR_PASSWORD_FIELD);
            if (!passwdNew.length) {
                setPasswordError(EMPTY_PASSWORD_FIELD);
            }
        } else setPasswordError('');
        setPassword(passwdNew);
    }, []);

    const BlurHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setEmailDirty(true);
        } else {
            setPasswordDirty(true);
        }
        setUserError("");
    }, []);

    return (
        <div className="Auth h-100 d-flex justify-content-center align-items-center text-center">
            <form className="Auth__form">
                <div className="form-group">
                    <label>Email</label>
                    {(emailDirty && emailError) && <AuthError msg={emailError}/>}
                    <input onChange={EmailHandler} value={email} name="email" onBlur={BlurHandler}
                           type="text" className="form-control"
                           placeholder="Введите email"/>
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    {(passwordDirty && passwordError) && <AuthError msg={passwordError}/>}
                    <input onChange={PasswordHandler} value={password} name="password"
                           onBlur={BlurHandler} type="password" className="form-control Auth__pass"
                           placeholder="Введите пароль"/>
                </div>
                <div className="form-check">
                    <input onChange={CheckBoxHandler} type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">Запомни меня</label>
                </div>
                {(userError) && <AuthError msg={userError}/>}
                <button disabled={!formValid} onClick={HandleSubmit} type="submit" className="btn Auth__btn">Войти
                </button>
            </form>
        </div>
    )
}

export default Auth;
