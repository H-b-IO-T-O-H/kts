import React, {useEffect, useState} from "react";
import "./authorization.scss"

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [userError, setUserError] = useState ('')

    const user={
        email:"c@c.ru",
        password: "12345678"
    }

    const userpr={
        email:"prc@c.ru",
        password: "qwer1234"
    }

    const userCheck = (e:any) => {
        e.preventDefault();
        if (email === (user.email || userpr.email) && password  === (user.password || userpr.password)) {
            alert("Ok")
        } else setUserError('Неверное имя пользователя или пароль')
    }

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        }
        else setFormValid(true)
    }, [emailError, passwordError])

    const emailHandler = (e:any) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            console.log(e)
            setEmailError('Некорректный email')
        }
        else setEmailError('')
    }
    const passwordHandler = (e:any) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8 || e.target.value.length > 30) {
            setPasswordError('Пароль должен быть от 8 до 30 символов')
        if (!e.target.value.length) {
            setPasswordError('Пароль не может быть пустым')
        }
        }
        else setPasswordError('')
    }

    const blurHandler = (e:any) =>{
        switch (e.target.name){
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
        setUserError("")
    }
    return(
        <div className="Auth h-100 d-flex justify-content-center align-items-center text-center">
            <form className="Auth__form">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    {(emailDirty && emailError) && <div style={{color:'#8B0000', font: 'cursive'}}>{emailError}</div>}
                    <input onChange={e => emailHandler(e)} value={email} name="email" onBlur={e => blurHandler(e)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Введите email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Пароль</label>
                    {(passwordDirty && passwordError) && <div style={{color:'#8B0000', font: 'cursive'}}>{passwordError}</div>}
                    <input onChange={e => passwordHandler(e)} value={password} name="password" onBlur={e => blurHandler(e)} type="password" className="form-control Auth__pass" id="exampleInputPassword1" placeholder="Введите пароль"/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Запомни меня</label>
                </div>
                {(userError) && <div style={{color:'#8B0000'}}>{userError}</div>}
                <button disabled={!formValid} onClick={(e) => {userCheck(e)}} type="submit" className="btn Auth__btn">Войти</button>
            </form>

        </div>
    )
}

export default Auth;


