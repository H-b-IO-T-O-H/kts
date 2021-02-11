import React, {useState} from "react";
import {v4 as uuid} from "uuid";
import "./DAndD.scss"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import ButtonTimetable from "@components/ButtonTimetable";
import ButtonWithInput from "@components/ButtonWithInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes"
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import ButtonsLogo from "@components/ButtonsLogo";

const PlusComponent = () => (
    <FontAwesomeIcon className={"icon-remover"} icon={faTimes} size={"lg"}
                     color={"#e85050"}/>
)

const reorder = (list: Array<object>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const copy = (source: Array<object>, destination: Array<object>, droppableSource: { index: number }, droppableDestination: { index: number }) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, {...item, id: uuid()});
    return destClone;
};

const Week = [
    {id: 0, day: "Пн", date: ""},
    {id: 1, day: "Вт", date: ""},
    {id: 2, day: "Ср", date: ""},
    {id: 3, day: "Чт", date: ""},
    {id: 4, day: "Пт", date: ""},
    {id: 5, day: "Сб", date: ""},
    {id: 6, day: "Вс", date: ""},
]


const buttonsContent = [
    {id: "btn-0", title: "СЕМ", color: "#348A3D"},
    {id: "btn-1", title: "ЛЕК", color: "#62d76e"},
    {id: "btn-2", title: "ЛР", color: "#8ebd3b"},
    {id: "btn-3", title: "ДЗ", color: "#e8722c"},
    {id: "btn-4", title: "РК", color: "#eabf19"},
    {id: "btn-5", title: "КОНС", color: "#5c70d9"},
    {id: "btn-6", title: "ЭКЗ", color: "#ce2c2c"},
]

/*const LessonsTime = [
    "8:30 - 10:05",
    "10:15 - 11:50",
    "12:00 - 13:35",
    "13:50 - 15:25",
    "15:40 - 17:15",
    "17:25 - 19:00",
    "19:10 - 20:45",
]*/


const FindNextDay = (Lists: object) => {
    let idx = 0;
    const isFull = !Week.some((item) => {
        if (!Lists[item.id]) {
            idx = item.id;
            return true;
        }
        return false;
    })
    return isFull ? -1 : idx;
}


const DragAndDrop = () => {
    const [Lists, ChangeList] = useState<object>({0: []})
    const [dayIdx, ChangeDayIdx] = useState<number>(1)
    const [inputsValue, setValues] = useState({})

    const changeInput = (id: string, value: string) => {
        const oldInputs = inputsValue
        oldInputs[id] = value
        setValues(oldInputs);
    }

    const droppableColumn = buttonsContent.map((btn, idx) => (
        <ButtonWithInput key={idx} btn={btn} onInputChange={changeInput}/>
    ))



    const addWeek = () => {
        return (
            <Droppable droppableId="items" isDropDisabled={true}>
                {(provided) => (
                    <div ref={provided.innerRef}>
                        {
                            droppableColumn.map((item, index) => {
                                return (
                                    <Draggable
                                        key={item.props.btn.id}
                                        draggableId={item.props.btn.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <React.Fragment>
                                                <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}
                                                >
                                                    <div className="DAndD-items__column" style={{
                                                        border: snapshot.isDragging ?
                                                            "1px dashed #000" : "1px solid #ddd"
                                                    }}>
                                                        <FontAwesomeIcon className="DAndD-items__column__drop ml-1"
                                                                         icon={faBars} size={"lg"}
                                                                         style={{color: snapshot.isDragging ? "#35b8b8" : ""}}/>

                                                        {item}
                                                    </div>
                                                </div>
                                                {snapshot.isDragging && (
                                                    <div className="DAndD-items__column__dragged">
                                                        <div style={{opacity: "0"}}>
                                                            {item}
                                                        </div>
                                                    </div>)
                                                }
                                            </React.Fragment>
                                        )}
                                    </Draggable>)
                            })}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }

    const onDragEnd = (result: any) => {
        const {source, destination} = result;

        if (!destination) {
            return;
        }
        const newList = {...Lists};

        switch (source.droppableId) {
            case destination.droppableId:
                if (destination.droppableId === "items") {
                    return;
                }
                newList[destination.droppableId] = reorder(
                    Lists[source.droppableId],
                    source.index,
                    destination.index
                )
                break;
            case "items":
                const draggableColumn = buttonsContent.map((btn, idx) => (
                    <div key={idx}>
                        <ButtonsLogo color={btn.color}>{btn.title}</ButtonsLogo>
                        {inputsValue[btn.id]}
                    </div>
                ))
                newList[destination.droppableId] = copy(
                    draggableColumn,
                    newList[destination.droppableId],
                    source,
                    destination
                )
                break;

        }
        ChangeList(newList);
    };

    const AddList = () => {
        const idx = FindNextDay(Lists)
        if (idx === -1) {
            return;
        }
        const newList = {...Lists};
        newList[idx] = [];
        ChangeList(newList);
        ChangeDayIdx(FindNextDay(newList));
    };

    const removeItem = (list: string, index: number) => {
        const newList = {...Lists};
        newList[list].splice(index, 1);
        ChangeList(newList);
    };

    const removeList = (list: number) => {
        const newList = {...Lists};
        delete newList[list];
        ChangeList(newList);
        const idx = FindNextDay(newList);
        ChangeDayIdx(idx);
    }


    return (
        <div className="DAndD text-center">

            <div className="mb-1">
                {dayIdx !== -1 ?
                    <ButtonTimetable
                        onChange={AddList}
                        disabled={false}
                        btn={{id: uuid(), color: "#4fbfb4"}}
                    >
                        <div className="d-flex flex-row flex-nowrap justify-content-around">
                            <FontAwesomeIcon icon={faPlus} size={"lg"}
                                             color={"white"}/>
                            <span
                                className="DAndD-container__header__text_white">{Week[dayIdx].day}</span>
                        </div>
                    </ButtonTimetable>
                    : null}
            </div>

            <div className="d-flex flex-row">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="col-6">

                        {Object.keys(Lists).map((list) => (
                            <Droppable key={list} droppableId={list}>
                                {(provided, snapshot) => (
                                    <div className="DAndD-container" ref={provided.innerRef}
                                         style={{border: snapshot.isDraggingOver ? "3px dashed #000" : "3px solid #ddd"}}>
                                        <div
                                            className="DAndD-container__header d-flex flex-row justify-content-between">
                                            <span className="DAndD-container__header__text">{Week[list].day}</span>
                                            <button type="button"
                                                    className="link-button"
                                                    onClick={() => {
                                                        removeList(parseInt(list))
                                                    }}
                                                    style={{display: Lists[list].length ? "none" : ""}}
                                            >
                                                {PlusComponent()}
                                            </button>
                                        </div>

                                        <div className="DAndD__content">
                                            {Lists[list].length ? Lists[list].map((item: { id: string }, index: number) => (
                                                    <Draggable key={item.id} draggableId={item.id}
                                                               index={index}>
                                                        {(provided, snapshot) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps}
                                                                 style={
                                                                     provided.draggableProps.style
                                                                 }>

                                                                <div className="DAndD-container__item d-flex flex-row"
                                                                     style={{border: snapshot.isDragging ? "1px dashed #000" : "1px solid #ddd"}} {...provided.dragHandleProps}>
                                                                    <div className="d-flex flex-row align-content-end">
                                                                        {item}
                                                                    </div>
                                                                    <button type="button"
                                                                            className="link-button"
                                                                            onClick={() => {
                                                                                removeItem(list, index)
                                                                            }}>
                                                                        {PlusComponent()}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>)) :
                                                <div className="text-center">
                                                    <span className="text-black-50">Drop items here</span>
                                                </div>
                                            }
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                    {addWeek()}
                </DragDropContext>
            </div>
        </div>
    );
}

export default DragAndDrop;
