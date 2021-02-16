import React, {useState} from "react";
import {v4 as uuid} from "uuid";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";

import ButtonTimetable from "@components/ButtonTimetable";
import ButtonWithInput from "@components/ButtonWithInput";
import AdminPanel from "@components/AdminPanel";
import {Urls} from "@config/urls";
import {buttonsContent, Week} from "@config/config";
import DroppableElem from "@components/DragAndDrop/DroppableElem";
import DraggableArea from "@components/DragAndDrop/DraggableArea";
import DroppableArea from "@components/DragAndDrop/DroppableArea";
import {findNextDay, copy, reorder} from "@components/DragAndDrop/config";

import "./DAndD.scss"

const DragAndDrop = () => {
    const history = useHistory();
    const [Lists, ChangeList] = useState<object>({0: []})
    const [dayIdx, ChangeDayIdx] = useState<number>(1)
    const [areasValue, setAreasValues] = useState({})
    const [inputsValue, setValues] = useState({})

    const changeArea = React.useCallback((id: string, value: string) => {
        const oldAreas = areasValue
        oldAreas[id] = value
        setAreasValues(oldAreas);
    }, [areasValue]);

    const changeInput = React.useCallback((id: string, value: string) => {
        const oldInputs = inputsValue
        oldInputs[id] = value
        setValues(oldInputs);
    }, [inputsValue]);

    const droppableColumn = React.useMemo(() => (buttonsContent.map((btn, idx) => (
        <ButtonWithInput key={idx} btn={btn} onAreaChange={changeArea} onInputChange={changeInput}
                         inputs={{maxInputLength: 5, maxAreaLength: 70}}/>
    ))), [changeInput, changeArea])

    const onDragEnd = React.useCallback((result: DropResult) => {
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

                const draggable = <DroppableElem sourceIdx={source.index}
                                                 header={buttonsContent[source.index].title !== "СР" ?
                                                     areasValue[buttonsContent[source.index].id] : "Самостоятельная работа"}
                                                 footer={inputsValue[buttonsContent[source.index].id]}/>

                newList[destination.droppableId] = copy(
                    draggable,
                    newList[destination.droppableId],
                    destination.index
                )
                break;
        }
        ChangeList(newList);
    },[Lists, areasValue, inputsValue]);

    const AddList = React.useCallback(() => {
        const idx = findNextDay(Lists)
        if (idx === -1) {
            return;
        }
        const newList = {...Lists};
        newList[idx] = [];
        ChangeList(newList);
        ChangeDayIdx(findNextDay(newList));
    }, [Lists]);

    const removeItem = React.useCallback((list: string, index: number) => {
        const newList = {...Lists};
        newList[list].splice(index, 1);
        ChangeList(newList);
    }, [Lists]);

    const removeList = React.useCallback((list: number) => {
        const newList = {...Lists};
        delete newList[list];
        ChangeList(newList);
        const idx = findNextDay(newList);
        ChangeDayIdx(idx);
    }, [Lists]);

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
                        <DroppableArea Lists={Lists} removeList={removeList} removeItem={removeItem}/>
                    </div>
                    <div className="col-7 d-flex">
                        <DraggableArea droppableColumn={droppableColumn}/>
                    </div>
                </DragDropContext>
            </div>
            <hr/>
            <ButtonTimetable
                onChange={() => {
                    history.replace(Urls.timetable.byId)
                }}
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
