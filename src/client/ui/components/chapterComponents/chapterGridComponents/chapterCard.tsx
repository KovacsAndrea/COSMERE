import { useNavigate } from "react-router-dom"
import './chapterStyle.css'
import axios from "axios";

export const ChapterCard: React.FC <{
    chapterId: any,
    bookId: any,
    chapterNumber: any,
    title: any, 
    bookData: any,
    description: any, 
    wordcount: any,
    pov: any
    setChapterWasDeleted: any
     }> = ({
    chapterId, 
    bookId, 
    chapterNumber, 
    title, 
    bookData,
    description, 
    wordcount,
    pov,
    setChapterWasDeleted
}) => {
    const token = sessionStorage.getItem('token')
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

    const handleDeleteChapter = async () => {
        await axios.delete("http://localhost:4000/mongoChapters/" + chapterId, {headers: {Authorization: `${token}`}})
        setChapterWasDeleted(true)
    }

    return(
        <>
            <div className="card"> 
                <div className="cardHeader">{chapterTitle}</div>
                <div className="cardBody"> 
                    <div className="chapter-card-book-title">{bookData._title}</div>
                    <div className="cardContent">{description}</div>
                    <div className="cardContent">Word count: {wordcount}</div>
                    <div className="cardContent">Point of view: {pov}</div>
                </div>
                <div className="cardFooter">
                    <button className="edit" onClick = {handleEditChapter}>Details</button>
                    <button className="delete" onClick={handleDeleteChapter}>Delete</button>
                    </div>
            </div>
        </>
    )
}