import React, {useEffect, useState} from "react";
import "./Home.scss"
import Card from "@components/Card";
import Error from "@components/Error";

// <a href="#" className="btn btn-primary">Переход куда-нибудь(кнопка в карточку для перехода по ссылке)"</a> под параграфом
//<div className="Error d-flex align-items-center justify-content-center">
//                 <Error content={'fghjk'}/>
//             </div>

const Home = () => {

    const [Err, setErr] = useState(false)

    const HandlerChange = () => {
        const current = Err;
        setErr(true)
        if (!current) {
            setTimeout(()=>setErr(false), 4900);
        }
    }

    return (
        <div>
            <Error content={'weruiop rftyhuiop 5f6gy7hu8l sdrtfyiop rtyiojpkl[ eruiop[ srdtyuiop'} displayed={Err}/>
            <div className="Home d-flex flex-row flex-nowrap">
                <Card title={'День недели и дата'} item1={'Дисциплина'} item2={'Дисциплина'} item3={'Дисциплина'} item4={'Дисциплина'}/>
                <Card title={'День недели и дата'} item1={'Дисциплина'} item2={'Дисциплина'} item3={'Дисциплина'} item4={'Дисциплина'}/>
                <Card title={'День недели и дата'} item1={'Дисциплина'} item2={'Дисциплина'} item3={'Дисциплина'} item4={'Дисциплина'}/>
                <Card title={'День недели и дата'} item1={'Дисциплина'} item2={'Дисциплина'} item3={'Дисциплина'} item4={'Дисциплина'}/>
                <Card title={'День недели и дата'} item1={'Дисциплина'} item2={'Дисциплина'} item3={'Дисциплина'} item4={'Дисциплина'}/>
                <Card title={'День недели и дата'} item1={'Дисциплина'} item2={'Дисциплина'} item3={'Дисциплина'} item4={'Дисциплина'}/>
                <Card title={'День недели и дата'} item1={'Дисциплина'} item2={'Дисциплина'} item3={'Дисциплина'} item4={'Дисциплина'}/>
            </div>
            <button type="button" className="btn btn-danger er" onClick={HandlerChange}>Ошибка</button>
        </div>
    )
}

export default Home;