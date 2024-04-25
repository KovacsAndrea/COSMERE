import { useNavigate } from "react-router-dom"
import './chapterStyle.css'

export const ChapterCard: React.FC <{
    chapterId: any,
    bookId: any,
    chapterNumber: any,
    title: any, 
    bookData: any,
    description: any, 
    wordcount: any,
    pov: any
     }> = ({
    chapterId, 
    bookId, 
    chapterNumber, 
    title, 
    bookData,
    description, 
    wordcount,
    pov 
}) => {
    const navigate = useNavigate();
    const editableChapterCardData = {
        chapterId: chapterId,
        bookId: bookId,
        chapterNumber: chapterNumber,
        title: title,
        bookData: bookData,
        description: description,
        wordcount: wordcount,
        pov: pov
    }
    const chapterTitle = `Ch.${chapterNumber}: ${title}`
    const handleEditChapter = () => {
        navigate(`/chapters/${editableChapterCardData.chapterId}`, {state: {editableChapterCardData}})
    }
    return(
        <>
            <div className="card"> 
                <div className="cardHeader">{chapterTitle}</div>
                <div className="cardBody"> 
                    <div className="chapter-card-book-title">{bookData.title}</div>
                    <div className="cardContent">{description}</div>
                    <div className="cardContent">Word count: {wordcount}</div>
                    <div className="cardContent">Point of view: {pov}</div>
                </div>
                <div className="cardFooter">
                    <button className="edit" onClick = {handleEditChapter}>Details</button>
                    <button className="delete">Delete</button>
                    </div>
            </div>
        </>
    )
}