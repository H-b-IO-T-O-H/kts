import React, {Component} from 'react';
import {v4 as uuid} from 'uuid';
import styled from 'styled-components';
import "./DAndD.scss"
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import ButtonTimetable from "@components/ButtonTimetable";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

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

const move = (source: Array<object>, destination: Array<object>, droppableSource: { index: number; droppableId: string }, droppableDestination: { index: number; droppableId: string }) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const removeItem = (source: Array<object>, index: number) => {
    const list = Array.from(source);
    list.splice(index, 1);

    return list;
}

const removeList = (source: object, key: number) => {
    delete (source[key]);
    return source;
}


interface ItemStyled {
    isDragging?: boolean;
}

const Item = styled.div<ItemStyled>`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};

`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;


const Week = [
    {id: 0, day: "Понедельник"},
    {id: 1, day: "Вторник"},
    {id: 2, day: "Среда"},
    {id: 3, day: "Четверг"},
    {id: 4, day: "Пятница"},
    {id: 5, day: "Суббота"},
    {id: 6, day: "Воскресенье"},
]


const ITEMS = [
    {
        id: uuid(),
        element: <ButtonTimetable id={uuid()} onChange={() => {
            alert(1)
        }}
                                  disabled={false}
                                  color={"#348A3D"} title={"CЕМ"}/>
    },
    {
        id: uuid(),
        element: <ButtonTimetable id={uuid()} onChange={() => {
            alert(1)
        }}
                                  disabled={false}
                                  color={"#62d76e"} title={"ЛЕК"}/>
    },
    {
        id: uuid(),
        element: <ButtonTimetable id={uuid()} onChange={() => {
            alert(1)
        }}
                                  disabled={false}
                                  color={"#8ebd3b"} title={"ЛР"}/>
    },
    {
        id: uuid(),
        element: <ButtonTimetable id={uuid()} onChange={() => {
            alert(1)
        }}
                                  disabled={false}
                                  color={"#e8722c"} title={"ДЗ"}/>
    },
    {
        id: uuid(),
        element: <ButtonTimetable id={uuid()} onChange={() => {
            alert(1)
        }}
                                  disabled={false}
                                  color={"#eabf19"} title={"РК"}/>
    },
    {
        id: uuid(),
        element: <ButtonTimetable id={uuid()} onChange={() => {
            alert(1)
        }}
                                  disabled={false}
                                  color={"#5c70d9"} title={"КОНС"}/>
    },
    {
        id: uuid(),
        element: <ButtonTimetable id={uuid()} onChange={() => {
            alert(1)
        }}
                                  disabled={false}
                                  color={"#ce2c2c"} title={"ЭКЗ"}/>
    },
    {
        id: uuid(),
        fixed: true,
        element: <ButtonTimetable id={uuid()} onChange={() => {
            alert(1)
        }}
                                  disabled={false}
                                  color={"#000000"} title={"Fixed"}/>
    }
];


class DragAndDrop extends Component {

    state = {
        0: []
    };

    onDragEnd = (result: any) => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                this.setState({
                    [destination.droppableId]: reorder(
                        this.state[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                this.setState({
                    [destination.droppableId]: copy(
                        ITEMS,
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                this.setState(
                    move(
                        this.state[source.droppableId],
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };

    addList = () => {
        let idx = 0;
        const isFull = !Week.some((item) => {
            if (!this.state[item.id]) {
                idx = item.id;
                return true;
            }
            return false;
        })

        if (isFull) {
            return;
        }
        this.setState({[idx]: []});
    };

    removeItem = (list: string, index: number) => {
        this.setState({[list]: removeItem(this.state[list], index)});
    };

    removeList = (list: number) => {
        this.setState(removeList(this.state, list))
    }

    render() {
        return (
            <div className="d-flex flex-row">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="col-lg-6">
                        <div className="DAndD__Week">
                            <ButtonTimetable
                                onChange={this.addList}
                                id={uuid()}
                                disabled={false}
                                color={"#11233b"}
                            >
                                <FontAwesomeIcon icon={faPlus} size={"lg"}
                                                 color={"white"}/>
                            </ButtonTimetable>
                            {Object.keys(this.state).map((list) => (
                                <Droppable key={list} droppableId={list}>
                                    {(provided, snapshot) => (
                                        <div className="DAndD__container" ref={provided.innerRef}
                                             style={{border: snapshot.isDraggingOver ? '3px dashed #000' : '3px solid #ddd'}}>
                                            <h3 className="text-black-50 text-center">{Week[list].day}</h3>

                                            {this.state[list].length ? this.state[list].map((item: { id: string, element: any, fixed?: boolean }, index: number) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}
                                                               isDragDisabled={item.fixed}>

                                                        {(provided, snapshot) => (

                                                            <div ref={provided.innerRef} {...provided.draggableProps}
                                                                 style={
                                                                     provided.draggableProps.style
                                                                 }>
                                                                <div className="DAndD__container__item d-flex flex-row"
                                                                     style={{border: snapshot.isDragging ? '1px dashed #000' : '1px solid #ddd'}} {...provided.dragHandleProps}>
                                                                    {item.element}
                                                                    <button className="btn" onClick={() => {
                                                                        this.removeItem(list, index)
                                                                    }}><FontAwesomeIcon icon={faTimes} size={"lg"}
                                                                                        color={"red"}/></button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                                )
                                                :
                                                <div>
                                                    <span className="text-black-50">Drop items here</span>
                                                    <button className="btn" onClick={() => {
                                                        this.removeList(parseInt(list))
                                                    }}><FontAwesomeIcon icon={faTimes} size={"lg"}
                                                                        color={"red"}/></button>
                                                </div>
                                            }
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                    </div>
                    <Droppable droppableId="ITEMS" isDropDisabled={true}>
                        {(provided) => (
                            <div ref={provided.innerRef}>
                                {ITEMS.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                        //isDragDisabled={true}
                                    >
                                        {(provided, snapshot) => (
                                            <React.Fragment>
                                                <Item ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      isDragging={snapshot.isDragging}
                                                >
                                                    {item.element}
                                                </Item>
                                                {snapshot.isDragging && (<Clone>{item.element}</Clone>)}
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
}

export default DragAndDrop;
