import React, {Component} from 'react';
import {v4 as uuid} from 'uuid';
import styled from 'styled-components';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import ButtonTimetable from "@components/ButtonTimetable";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

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

const removeList = (source: object, key: string) => {
    delete(source[key]);
    return source;
}

const Content = styled.div`
  margin-right: 200px;
`;

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

interface ListStyled {
    isDraggingOver?: boolean;
}

const List = styled.div<ListStyled>`
  border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const Kiosk = styled(List)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
`;

const Container = styled(List)`
  margin: 0.5rem 0.5rem 1.5rem;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin: 0 1rem;
`;

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
    }
];


class DAndD extends Component {
    state = {
        [uuid()]: []
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
        this.setState({[uuid()]: []});
    };

    removeItem = (list: string, index: number) => {
        this.setState({[list]:removeItem(this.state[list], index)});
    };

    removeList = (list: string) => {
        this.setState(removeList(this.state, list))
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="ITEMS" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <Kiosk ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
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
                        </Kiosk>
                    )}
                </Droppable>
                <Content>
                    <Button onClick={this.addList}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                            />
                        </svg>
                        <ButtonText>Add List</ButtonText>
                    </Button>

                    {Object.keys(this.state).map((list) => (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <Container
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}>
                                    {this.state[list].length ? this.state[list].map((item: { id: string, element: any }, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <Item ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          isDragging={
                                                              snapshot.isDragging
                                                          }
                                                          style={
                                                              provided.draggableProps.style
                                                          }>
                                                        <Handle
                                                            {...provided.dragHandleProps}>
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                                                />
                                                            </svg>
                                                        </Handle>
                                                        {item.element}
                                                        <button className="btn" onClick={() => {
                                                            this.removeItem(list, index)
                                                        }}><FontAwesomeIcon icon={faTimes} size={"lg"}
                                                                            color={"red"}/></button>
                                                    </Item>
                                                )}
                                            </Draggable>
                                        )
                                        )
                                        :
                                        <div>
                                            <Notice>Drop items here</Notice>
                                            <button className="btn" onClick={() => {
                                                this.removeList(list)
                                            }}><FontAwesomeIcon icon={faTimes} size={"lg"}
                                                                color={"red"}/></button>
                                        </div>


                                    }
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    ))}

                </Content>
            </DragDropContext>
        );
    }
}

export default DAndD;