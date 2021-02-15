import React, {useState} from "react";
import {v4 as uuid} from "uuid";
import "./DAndD.scss"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import ButtonTimetable from "@components/ButtonTimetable";
import ButtonWithInput from "@components/ButtonWithInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes"
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import ButtonsLogo from "@components/ButtonsLogo";
import AdminPanel from "@components/AdminPanel";
import {useHistory} from "react-router-dom";
import {Urls} from "@config/urls";
import {buttonsContent, LessonsTime, Week} from "@config/config";

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
    const history = useHistory();
    const [Lists, ChangeList] = useState<object>({0: []})
    const [dayIdx, ChangeDayIdx] = useState<number>(1)
    const [areasValue, setAreasValues] = useState({})
    const [inputsValue, setValues] = useState({})

    const changeArea = (id: string, value: string) => {
        const oldAreas = areasValue
        oldAreas[id] = value
        setAreasValues(oldAreas);
    }

    const changeInput = (id: string, value: string) => {
        const oldInputs = inputsValue
        oldInputs[id] = value
        setValues(oldInputs);
    }

    const droppableColumn = buttonsContent.map((btn, idx) => (
        <ButtonWithInput key={idx} btn={btn} onAreaChange={changeArea} onInputChange={changeInput}
                         inputs={{maxInputLength: 5, maxAreaLength: 70}}/>
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
                if (Lists[destination.droppableId].length === Week.length) {
                    return;
                }
                const draggableColumn = buttonsContent.map((btn, index) => (
                    <div>
                        <div className="DAndD-item__header" key={btn.id}>
                            <span
                                className="DAndD-item__header__text">{btn.title !== "СР" ? areasValue[btn.id] : "Самостоятельная работа"}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                            <ButtonsLogo idx={index}/>
                            <span className="DAndD-item__header__text mt-1 mr-1">{inputsValue[btn.id]}</span>
                        </div>
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

            <div className="d-flex flex-row">
                <div className="d-none d-sm-block col-sm-4 col-md-5"/>
                <div className="col-md-7">
                    <AdminPanel dayIdx={dayIdx} changeDay={AddList}/>
                </div>
            </div>
            <hr/>
            <div className="d-flex flex-row">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="col-5">
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
                                                                <div className="DAndD-item"
                                                                     style={{border: snapshot.isDragging ? "1px dashed #000" : "1px solid #ddd"}} {...provided.dragHandleProps}>
                                                                    <button type="button"
                                                                            className="link-button DAndD-item__close"
                                                                            onClick={() => {
                                                                                removeItem(list, index)
                                                                            }}>
                                                                        {PlusComponent()}
                                                                    </button>
                                                                    {item}
                                                                    <div
                                                                        className="DAndD-item__lessons">{LessonsTime[index]}</div>
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
                    <div className="col-7 d-flex">
                        {addWeek()}
                    </div>
                </DragDropContext>
            </div>
            <hr/>
            <ButtonTimetable
                onChange={() => {
                    console.log(Lists);
                    history.replace(Urls.home)
                }}
                disabled={false}
                btn={{id: uuid(), color: "#36a51c"}}
            >
                <div className="d-flex flex-row align-items-center justify-content-around">
                    <FontAwesomeIcon icon={faSave} size={"sm"}/>
                    <div>Save</div>
                </div>


            </ButtonTimetable>
        </div>
    );
}

export default DragAndDrop;
