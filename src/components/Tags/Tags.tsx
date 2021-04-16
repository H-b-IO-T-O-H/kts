import React, {useState} from "react";
import "./Tags.scss"
import IconPlus from "@components/IconPlus";
import StatusLabel from "@components/StatusLabel";

type Props = {
    placeholder: string;
}

const Tags: React.FC<Props> = ({placeholder}) => {
    const [tags, changeTags] = React.useState<Array<{ id: string, content: string }>>([])
    const [inp, setInp] = React.useState("")
    const [err, showLabel] = useState<{content:string, success:boolean}>({content: '', success: false});

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInp(e.target.value)
    }

    const handleDelete = React.useCallback((e: any) => {
        const tagId = e.target.id;
        console.log(tags)
        tags.findIndex((obj)=>(obj.id == e.target.id))
        tags.splice(tagId, 1)

    }, [tags]);


    const addTag = React.useCallback(() => {
        const tagsOld = [...tags];
        const id = `tag-${tagsOld.length.toString()}`;
        if (inp === '') {
            showLabel({content: 'Введите дисциплину!', success: false})
            return;
        }

        tagsOld.push({id: id, content: inp})

        changeTags(tagsOld)
        setInp("")
    }, [tags, inp, err])



    return (
        <div>
            <StatusLabel info={err} clearText={()=>{showLabel({content:'', success:err.success})}}/>
            <div>{tags.map((tag, id) => (
                <div className="d-flex justify-content-center align-items-center" key={tag.id}>
                    <div className="tag mt-1 mr-1">{tag.content}</div>
                    <button id={tag.id} className="btn_delete" onClick={handleDelete}><IconPlus/></button>
                </div>
            ))}</div>
            <div>{tags.length}</div>
            <input value={inp} onChange={handleInput} type="text" className="Lesson mt-2"
                   placeholder={placeholder}/>
            <button type="button" onClick={addTag} className="add text-center">+</button>
        </div>
    )
}

export default Tags;