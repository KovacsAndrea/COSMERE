import { CircleInsignia } from "./circleInsignia"
import { EditableChapterCard } from "./editableChapterCard"

export const EditableChapterCardInsignia: React.FC<{}> = ({}) => {
    return (
        <>
            <div className="editable-chapter-card-insignia-wrapper">
                <CircleInsignia position="left-side"/>
                <EditableChapterCard /> 
                <CircleInsignia position="right-side"/>
            </div>
        </>
    )
}