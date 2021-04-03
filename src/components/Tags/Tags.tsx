import React from "react";
import "./Tags.scss"
import IconPlus from "@components/IconPlus";

type Props = {
    placeholder: string;
}

const Tags: React.FC<Props> = ({placeholder}) => {
    const [tags, changeTags] = React.useState<Array<{ tagId: string, elem: React.ReactNode }>>([])
    const [inp, setInp] = React.useState("")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInp(e.target.value)
    }

    const handleDelete = (e: any) => {
        const tagId = e.target.id;
        console.log(tags);
        const idx = tags.find((obj)=>(obj.tagId===tagId));
        console.log(idx)

    }

    const addTag = () => {
        const tagsOld = [...tags];
        const id = `tag-${tagsOld.length.toString()}`;

        tagsOld.push(
            {
                tagId: id,
                elem: <div className="d-flex justify-content-center align-items-center" key={id}>
                    <div className="tag mt-1 mr-1">{inp}</div>
                    <button className="btn_delete text-center" onClick={handleDelete}><IconPlus/></button>
                </div>
            }
        )

        changeTags(tagsOld)
        console.log("tags = ", tags)
        console.log(tagsOld)
        setInp("")
    }
    return (
        <div>
            <div>{tags.map((tag) => (tag.elem))}</div>
            <input value={inp} onChange={handleInput} type="text" className="Lesson mt-2"
                   placeholder={placeholder}/>
            <button type="button" onClick={addTag} className="add text-center">+</button>
        </div>
    )
}

export default Tags;