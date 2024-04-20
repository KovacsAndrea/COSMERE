import { CircleInsignia } from "./circleInsignia"
import { EditableChapterCard } from "./editableChapterCard"

export const EditableChapterCardInsignia: React.FC<{}> = ({}) => {
    return (
        <>
            <div className="editableBookCardInsigniaFlex">
                <CircleInsignia />
                <EditableChapterCard />
                <CircleInsignia />
            </div>
        </>
    )
}