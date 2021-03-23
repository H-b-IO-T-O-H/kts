import React from "react";
import "./Tags.scss"
import IconPlus from "@components/IconPlus";

type Props = {
    placeholder: string;
    id: string;
}

const Tags: React.FC<Props> = ({id,placeholder}) => {
    const [tags, changeTags] = React.useState<Array<React.ReactNode>>([])
    const [inp, setInp] = React.useState("")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInp(e.target.value)
    }

    const addTag = () => {
        const tagsOld = [...tags]
        tagsOld.push(
            <div className="d-flex justify-content-center align-items-center">
                <div className="tag mt-1 mr-1" key={tagsOld.length} id={id}>{inp}</div>
                <IconPlus/>
            </div>
        )

        changeTags(tagsOld)
        setInp("")
    }
    return (
        <div>
            <div>{tags}</div>
            <input value={inp} onChange={handleInput} type="text" className="Lesson mt-2"
                   placeholder={placeholder}/>
            <button type="button" onClick={addTag} className="add text-center">+</button>
        </div>
    )
}

export default Tags;