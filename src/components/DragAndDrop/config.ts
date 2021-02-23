import {Week} from "@config/config";
import {v4 as uuid} from "uuid";
import {makeDelete, makePost} from "@utils/network";
import {Urls} from "@config/urls";

export const Labels = {'sem': 0, 'lek': 1, 'lr': 2, 'dz': 3, 'rk': 4, 'cons': 5, 'exam': 6, 'free': 7}
const LabelsInt = {0: 'sem', 1: 'lek', 2: 'lr', 3: 'dz', 4: 'rk', 5: 'cons', 6: 'exam', 7: 'free'}


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

export const checkFill = (header_text: string, footer_text: string): boolean => {
    return header_text?.length >= 2 && footer_text?.length >= 2
}

type Lesson = {
    lesson_id: string;
    title: string;
    lesson_type: string;
    auditorium: number;
}

export const getDayDataFromList = (day: Array<{ id: string, props: any }>) => {
    return day.map((lesson, index) => ({
        lesson_order: index + 1,
        lesson_id: lesson.id,
        title: lesson.props.header,
        auditorium: lesson.props.footer,
        lesson_type: LabelsInt[lesson.props.sourceIdx]
    }))
}

export const saveTimetable = (Lists: object, deleted: { lessons: Array<string> }) => {
    const week = {
        //timetable_id: "cb168d61-3592-42d1-b491-7a34d52277e5",
        //group_id: "af594367-b7a9-4d1c-bdeb-6f83150c6049",
        group: "IU10-73",
        week_type: "numerator",
        week_number: 1,
        days: <Array<object>>[]
    }
    console.log(deleted)
    const idx = Object.keys(Lists)
    idx.map((i) => {
        week.days.push(
            {
                day_order: parseInt(i) + 1,
                lessons: getDayDataFromList(Lists[i])
            }
        )
    });
    makeDelete(Urls.timetable.delete(), {lessons_ids: deleted.lessons}).then((response) => {
        if (response.status === 200) {
            makePost(Urls.timetable.post(), week).then((resp) => {
                console.log(response.status)
            }).catch((error) => {
                alert(error.toString())
            })
        }
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
        }
    })
}
