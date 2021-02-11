import React from "react";
import "./timetable.scss"
import DragAndDrop from "@components/DragAndDrop";



const Timetable = () => {
    return (
       <div>
           <DragAndDrop/>
       </div>
    )

}

export default React.memo(Timetable);
