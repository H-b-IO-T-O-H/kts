import React from "react";
import "./Tags.scss"
import IconPlus from "@components/IconPlus";

type Props = {
    placeholder: string;
    //id: string;
}

const Tags: React.FC<Props> = ({placeholder}) => {
    const [tags, changeTags] = React.useState<Array<{ id: string, content: string }>>([])
    const [inp, setInp] = React.useState("")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInp(e.target.value)
    }

    const handleDelete = React.useCallback((e: any) => {
        const tagId = e.target.id;
        console.log(tags)



    }, [tags]);

    const addTag = () => {
        const tagsOld = [...tags];
        const id = `tag-${tagsOld.length.toString()}`;

        tagsOld.push({id: id, content: inp})

        changeTags(tagsOld)
        setInp("")
    }
    return (
        <div>
            <div>{tags.map((tag, id) => (
                <div className="d-flex justify-content-center align-items-center" key={tag.id}>
                    <div className="tag mt-1 mr-1">{tag.content}</div>
                    <button id={tag.id} className="btn btn_delete" onClick={handleDelete}><IconPlus/></button>
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