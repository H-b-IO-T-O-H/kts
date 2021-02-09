import React, {useEffect, useState} from "react";
import "./authorization.scss"
import {DEFAULT_SESSION_TIME, ERROR_AUTHORIZATION} from "@utils/constants";
import {Urls} from "@config/urls";
import {useHistory} from "react-router-dom"

export const Logout = (history: any) => {
    localStorage.setItem("loginTime", "");
    history.push(Urls.auth)
}

export const DefaultCheckLogin = () => {
    const lastAuthTime = parseInt(localStorage.getItem("loginTime") as string);
    return lastAuthTime != null && Date.now() - lastAuthTime < DEFAULT_SESSION_TIME;
}

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [userError, setUserError] = useState('')
    const [checkBox, setCheckBox] = useState(false);
    const history = useHistory();

    const userPupkin = {
        email: "email@y.ru",
        password: "email@y.ru"
    }

    const CheckBoxHandler = (e: any) => {
        if (e.target.checked) {
            setCheckBox(true);
        } else {
            setCheckBox(false);
        }
    }

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        //TODO: get data from server
        if (email !== userPupkin.email || password !== userPupkin.password) {
            setUserError(ERROR_AUTHORIZATION);
            return;
        }
        //if (checkBox) {
            localStorage.setItem("loginTime", Date.now().toString());
        //}
        //localStorage.setItem("userType", USER_TYPE_PROFESSOR)
        console.log(`UserType: ${localStorage.getItem("userType")}, loginTime: ${localStorage.getItem("loginTime")}`);
        console.log(`email="${email}", password="${password}", rememberMe="${checkBox}"`);
        history.push(Urls.home);
    }

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else setFormValid(true)
    }, [emailError, passwordError])

    const EmailHandler = (e: any) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            console.log(e)
            setEmailError('Некорректный email')
        } else setEmailError('')
    }
    const PasswordHandler = (e: any) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8 || e.target.value.length > 30) {
            setPasswordError('Пароль должен быть от 8 до 30 символов')
            if (!e.target.value.length) {
                setPasswordError('Пароль не может быть пустым')
            }
        } else setPasswordError('')
    }

    const BlurHandler = (e: any) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
        setUserError("")
    }
    return (
        <div className="Auth h-100 d-flex justify-content-center align-items-center text-center">
            <form className="Auth__form">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    {(emailDirty && emailError) && <div style={{color: '#8B0000', font: 'cursive'}}>{emailError}</div>}
                    <input onChange={e => EmailHandler(e)} value={email} name="email" onBlur={e => BlurHandler(e)}
                           type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Введите email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Пароль</label>
                    {(passwordDirty && passwordError) &&
                    <div style={{color: '#8B0000', font: 'cursive'}}>{passwordError}</div>}
                    <input onChange={e => PasswordHandler(e)} value={password} name="password"
                           onBlur={e => BlurHandler(e)} type="password" className="form-control Auth__pass"
                           id="exampleInputPassword1" placeholder="Введите пароль"/>
                </div>
                <div className="form-check">
                    <input onChange={e => CheckBoxHandler(e)} type="checkbox" className="form-check-input"
                           id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Запомни меня</label>
                </div>
                {(userError) && <div style={{color: '#8B0000'}}>{userError}</div>}
                <button disabled={!formValid} onClick={HandleSubmit} type="submit" className="btn Auth__btn">Войти
                </button>
            </form>
        </div>
    )
}

export default Auth;


