import {Week} from "@config/config";
import {v4 as uuid} from "uuid";

export const findNextDay = (Lists: object) => {
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

export const reorder = (list: Array<object>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const copy = (item: object, destination: Array<object>, droppableIndex: number) => {
    const destClone = Array.from(destination);

    destClone.splice(droppableIndex, 0, {...item, id: uuid()});
    return destClone;
};
