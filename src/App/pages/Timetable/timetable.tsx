import React from "react";
//import ButtonTimetable from "@components/ButtonTimetable";
//import HiddenInput from "@components/HiddenInput";
import "./timetable.scss"

import DAndD from "@components/DragAndDrop";


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
    // const [activeBtn, setActive] = React.useState(
    //     {id: ""}
    // );


    // const ids = ["btn-0", "btn-1", "btn-2", "btn-3", "btn-4", "btn-5", "btn-6"]
    //
    // const setActiveBtn = (id: string) => {
    //     setActive({id: activeBtn.id !== id ? id : ""});
    // }

    // return (
    //     <div className="d-flex flex-row">
    //         <div className="col-8 ">
    //             <Table/>
    //         </div>
    //         <div className="d-flex flex-row align-content-start col-4 ">
    //             <div className="d-flex flex-column">
    //                 <ButtonTimetable id={ids[0]} onChange={setActiveBtn}
    //                                  disabled={ids[0] !== activeBtn.id && activeBtn.id !== ""}
    //                                  color={"#348A3D"} title={"CЕМ"}/>
    //                 <ButtonTimetable id={ids[1]} onChange={setActiveBtn}
    //                                  disabled={ids[1] !== activeBtn.id && activeBtn.id !== ""}
    //                                  color={"#62d76e"} title={"ЛЕК"}/>
    //                 <ButtonTimetable id={ids[2]} onChange={setActiveBtn}
    //                                  disabled={ids[2] !== activeBtn.id && activeBtn.id !== ""}
    //                                  color={"#8ebd3b"} title={"ЛР"}/>
    //                 <ButtonTimetable id={ids[3]} onChange={setActiveBtn}
    //                                  disabled={ids[3] !== activeBtn.id && activeBtn.id !== ""}
    //                                  color={"#e8722c"} title={"ДЗ"}/>
    //                 <ButtonTimetable id={ids[4]} onChange={setActiveBtn}
    //                                  disabled={ids[4] !== activeBtn.id && activeBtn.id !== ""}
    //                                  color={"#eabf19"} title={"РК"}/>
    //                 <ButtonTimetable id={ids[5]} onChange={setActiveBtn}
    //                                  disabled={ids[5] !== activeBtn.id && activeBtn.id !== ""}
    //                                  color={"#5c70d9"} title={"КОНС"}/>
    //                 <ButtonTimetable id={ids[6]} onChange={setActiveBtn}
    //                                  disabled={ids[6] !== activeBtn.id && activeBtn.id !== ""}
    //                                  color={"#ce2c2c"} title={"ЭКЗ"}/>
    //                 <div className="text-black-50"><HiddenInput disabled={false}
    //                                                             title={"Добавление описание события (необязательно)"}/>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <DAndD/>
    )

}

export default Timetable;
