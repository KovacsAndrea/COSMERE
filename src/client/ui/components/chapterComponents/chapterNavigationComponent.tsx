import { IoAddCircle, IoAddCircleOutline, IoChevronBackCircle, IoChevronBackCircleOutline } from "react-icons/io5"
import { CiCircleChevLeft, CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
export const ChapterNavigationComponent: React.FC<{bookId: any, bookTitle: any}> = ({bookId, bookTitle}) => {
    const navigate = useNavigate();
    const handleBackToBook = () => {
        navigate(`/details/${bookId}`, { state: { bookId } })
    }

    const editableChapterCardData = {
        chapterId: "6969696",
        bookId: bookId,
        chapterNumber: "?",
        title: "",
        bookTitle: bookTitle,
        description: "",
        wordcount: 0,
        pov: ""
    }
    const handleAddChapter = () => {
        navigate(`/chapters/${editableChapterCardData.chapterId}`, {state: {editableChapterCardData}})
    }
    return (<>
        <div className="save-delete-discard-icons-wrapper">
            <IoChevronBackCircle className = "icon-chapter-section chapter-nav" onClick={handleBackToBook}/>
            <IoAddCircle className = "icon-chapter-section chapter-nav" onClick={handleAddChapter}/>
        </div>
    </>)
}