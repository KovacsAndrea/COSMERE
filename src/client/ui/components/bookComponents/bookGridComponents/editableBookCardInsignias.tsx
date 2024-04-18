
import { EditableBookCard } from "./editableBookCard.tsx"
import './editableBookCardInsignia.css'
import React from "react";
export const EditableBookCardInsignia: React.FC<{}> = ({}) => {
    return <>
        <div className="editableBookCardInsigniaFlex"> 
            <div  className = "editableBookCardInsigniaItem">
                <div className="editableBookCardInsigniaItemPhotoLeftSmall" > </div>
                <div className="editableBookCardInsigniaItemPhotoLeft"></div>
            </div>
            <div className = "editableBookCardInsigniaItem"><EditableBookCard /></div>
            <div className = "editableBookCardInsigniaItem">
                <div className="editableBookCardInsigniaItemPhotoRight"></div>
                <div className="editableBookCardInsigniaItemPhotoRightSmall" ></div>
            </div>
        </div>
    </>
}