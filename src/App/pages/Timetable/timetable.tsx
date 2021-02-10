import React from "react";
import ButtonTimetable from "@components/ButtonTimetable";
import HiddenInput from "@components/HiddenInput";
import "./timetable.scss"
import DragAndDrop from "@components/DragAndDrop";


// const Table = () => (
//     <div className="table-wrap">
//         <table className="table table-bordered table-hover">
//             <thead>
//             <tr>
//                 <th scope="col">Дисциплины / Недели</th>
//                 <th scope="col">1</th>
//                 <th scope="col">2</th>
//                 <th scope="col">3</th>
//                 <th scope="col">4</th>
//                 <th scope="col">5</th>
//                 <th scope="col">6</th>
//                 <th scope="col">7</th>
//                 <th scope="col">8</th>
//                 <th scope="col">9</th>
//                 <th scope="col">10</th>
//                 <th scope="col">11</th>
//                 <th scope="col">12</th>
//                 <th scope="col">13</th>
//                 <th scope="col">14</th>
//                 <th scope="col">15</th>
//                 <th scope="col">16</th>
//                 <th scope="col">17</th>
//             </tr>
//             </thead>
//             <tbody>
//             <tr>
//                 <th scope="row">Защита информации от утечки по техническим каналам</th>
//                 <td className="table-elem">
//                 </td>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//             </tr>
//             <tr>
//                 <th scope="row">Основы криптографических методов защиты информации</th>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//             </tr>
//             <tr>
//                 <th scope="row">Системы передачи и обработки информации</th>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//             </tr>
//             <tr>
//                 <th scope="row">Спецдисциплина 11</th>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//             </tr>
//             <tr>
//                 <th scope="row">Устройства радиоэлектронных систем</th>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//             </tr>
//             <tr>
//                 <th scope="row">Цифровая обработка сигналов</th>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//                 <td/>
//             </tr>
//             </tbody>
//         </table>
//     </div>
// )

const Timetable = () => {
    const [activeBtn, setActive] = React.useState(
        {id: ""}
    );

    const buttonsContent = [
        {id: "btn-0", title: "СЕМ", color: "#348A3D"},
        {id: "btn-1", title: "ЛЕК", color: "#62d76e"},
        {id: "btn-2", title: "ЛР", color: "#8ebd3b"},
        {id: "btn-3", title: "ДЗ", color: "#e8722c"},
        {id: "btn-4", title: "РК", color: "#eabf19"},
        {id: "btn-5", title: "КОНС", color: "#5c70d9"},
        {id: "btn-6", title: "ЭКЗ", color: "#ce2c2c"},
    ]

    const setActiveBtn = (id: string) => {
        setActive({id: activeBtn.id !== id ? id : ""});
    }

    const buttons = buttonsContent.map((button) => (
        {
            id: button.id, description: "12", element:
                <div className="d-flex flex-row align-content-end">
                    <ButtonTimetable disabled={button.id !== activeBtn.id && activeBtn.id !== ""}
                                     title={button.title} color={button.color} onChange={setActiveBtn}
                                     id={button.id} key={button.id}/>
                    <div className="m-1">
                        <HiddenInput buttonId={button.id} disabled={button.id !== activeBtn.id} title={"Описание"}/>
                    </div>
                </div>


        }))
    return (
        <DragAndDrop items={buttons}/>
    )

}

export default Timetable;
