import React, {Component, useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import styled from "styled-components";
import "./DAndD.scss"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import ButtonTimetable from "@components/ButtonTimetable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes"
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons/faEllipsisH";

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

type Props = {
    id?: string,
    onChange?: any
    items: Array<{ id: string, element: object, description: string }>
}

const DragAndDrop: React.FC<Props> = ({items}) => {

    const [Lists, ChangeList] = useState<object>({0: []})
    const [ItemText, ChangeItemText] = useState<{ id: string }>({id: ""})

    const setActiveText = (id: string) => {
        ChangeItemText({id: ItemText.id !== id ? id : ""});
    }

    const onDragEnd = (result: any) => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                ChangeList({
                    [destination.droppableId]: reorder(
                        Lists[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case "items":
                ChangeList({
                    [destination.droppableId]: copy(
                        items,
                        Lists[destination.droppableId],
                        source,
                        destination
                    )
                })
                break;
        }
    };

    const AddList = () => {
        let idx = 0;
        const isFull = !Week.some((item) => {
            if (!Lists[item.id]) {
                idx = item.id;
                return true;
            }
            return false;
        })
        if (isFull) {
            return;
        }
        const newList = {...Lists};
        newList[idx] = []
        ChangeList(newList)
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
    }

    return (
        <div className="d-flex flex-row">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="col-6">
                    <div className="DAndD__Week">
                        <ButtonTimetable
                            onChange={AddList}
                            id={uuid()}
                            disabled={false}
                            color={"#11233b"}
                        >
                            <FontAwesomeIcon icon={faPlus} size={"lg"}
                                             color={"white"}/>
                        </ButtonTimetable>
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
                                                <FontAwesomeIcon icon={faTimes} size={"sm"}
                                                                 color={"red"}/>
                                            </button>
                                        </div>

                                        {Lists[list].length ? Lists[list].map((item: { id: string, element: any, fixed?: boolean, description: string}, index: number) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}
                                                           isDragDisabled={item.fixed}>
                                                    {(provided, snapshot) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps}
                                                             style={
                                                                 provided.draggableProps.style
                                                             }>

                                                            <div className="DAndD-container__item d-flex flex-row"
                                                                 style={{border: snapshot.isDragging ? "1px dashed #000" : "1px solid #ddd"}} {...provided.dragHandleProps}>
                                                                {item.element}

                                                                <button type="button"
                                                                        className="link-button"
                                                                        onClick={() => {
                                                                            removeItem(list, index)
                                                                        }}>
                                                                    <FontAwesomeIcon icon={faTimes} size={"sm"}
                                                                                     color={"red"}/>
                                                                </button>
                                                                <button type="button"
                                                                        className="link-button"
                                                                        onClick={() => {
                                                                            console.log(item.description);
                                                                            setActiveText(item.id)
                                                                        }}>
                                                                    <FontAwesomeIcon icon={faEllipsisH} size={"sm"}
                                                                                     color={"grey"}/>
                                                                </button>
                                                                {console.log(Lists)}
                                                                {ItemText.id === item.id ?
                                                                    <span>
                                                                        {item.description}
                                                                </span> :
                                                                    null
                                                                }
                                                            </div>

                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                            )
                                            :
                                            <div className="text-center">
                                                <span className="text-black-50 ">Drop items here</span>
                                            </div>
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </div>
                <Droppable droppableId="items" isDropDisabled={true}>
                    {(provided) => (
                        <div ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                    //isDragDisabled={true}
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

                                                    {item.element}
                                                </div>
                                            </div>
                                            {snapshot.isDragging && (
                                                <div className="DAndD-items__column__dragged">
                                                    <div style={{opacity: "0"}}>
                                                        {item.element}
                                                    </div>
                                                </div>)
                                            }
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default DragAndDrop;
