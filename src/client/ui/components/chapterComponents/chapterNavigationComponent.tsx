import { IoAddCircle, IoChevronBackCircle} from "react-icons/io5"
import { useNavigate } from "react-router-dom";
export const ChapterNavigationComponent: React.FC<{bookData: any}> = ({bookData}) => {
    const navigate = useNavigate();
    const handleBackToBook = () => {
        console.log("BACK TO BOOK")
        navigate(`/details/${bookData._id}`, { state: { bookData } })
    }

    const editableChapterCardData = {
        chapterId: "6969696",
        bookId: bookData.id,
        chapterNumber: "?",
        title: "",
        bookData: bookData,
        description: "",
        wordcount: 0,
        pov: ""
    }
    const handleAddChapter = () => {
        console.log("Add chapter")
        navigate(`/chapters/${editableChapterCardData.chapterId}`, {state: {editableChapterCardData}})
    }
    return (<>
        <div className="save-delete-discard-icons-wrapper">
            <IoChevronBackCircle className = "icon-chapter-section chapter-nav" onClick={handleBackToBook}/>
            <IoAddCircle className = "icon-chapter-section chapter-nav" onClick={handleAddChapter}/>
        </div>
    </>)
}