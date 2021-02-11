import React from "react";
import ButtonTimetable from "@components/ButtonTimetable";
import HiddenInput from "@components/HiddenInput";
import "./timetable.scss"
import DragAndDrop from "@components/DragAndDrop";

const Timetable = () => {
    const [activeBtn, setActive] = React.useState(
        {id: ""}
    );

    const [Value, ChangeValue] = React.useState({});

    const buttonsContent = [
        {id: "btn-0", title: "СЕМ", color: "#348A3D"},
        {id: "btn-1", title: "ЛЕК", color: "#62d76e"},
        {id: "btn-2", title: "ЛР", color: "#8ebd3b"},
        {id: "btn-3", title: "ДЗ", color: "#e8722c"},
        {id: "btn-4", title: "РК", color: "#eabf19"},
        {id: "btn-5", title: "КОНС", color: "#5c70d9"},
        {id: "btn-6", title: "ЭКЗ", color: "#ce2c2c"},
    ]

    const ChangeInputValue = (value: string, id: string) => {
        const inputsValue = Value;
        inputsValue[id] = value;
        ChangeValue(inputsValue);
        //console.log(id, activeBtn.id);
        //console.log(Value[id])
    }

    const setActiveBtn = (id: string) => {
        setActive({id: activeBtn.id !== id ? id : ""});
    }

    const buttons = buttonsContent.map((button) => (
        {
            id: button.id, element:
                {
                    buttons:
                        <ButtonTimetable disabled={button.id !== activeBtn.id && activeBtn.id !== ""}
                                         title={button.title} color={button.color} onChange={setActiveBtn}
                                         id={button.id} key={button.id}/>,
                    inputs: <HiddenInput value={Value[button.id]} onChange={ChangeInputValue} id={button.id}
                                         disabled={button.id !== activeBtn.id} title={"Описание"}/>,
                    description: Value[button.id]
                }
        }))

    return (<div>
            <DragAndDrop items={buttons}/>
        </div>
    )

}

export default Timetable;
