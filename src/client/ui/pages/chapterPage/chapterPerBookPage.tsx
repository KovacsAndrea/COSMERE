import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { ChapterGrid } from "../../components/chapterComponents/chapterGridComponents/chapterGrid";
import { Insignia } from "../../components/genericComponents/decor/insignia/insignia";
import './chapterPages.css'
export const ChaptersOfBookPage: React.FC<{}> = ({}) => {
    const location = useLocation();
    const bookId = location.state;
    const [chapterList, setChapterList] = useState([]);
    const [bookTitle, setBookTitle] = useState("")
    useEffect(() => {
        axios.get("http://localhost:4000/chapters/" + bookId). then(response => {
            setChapterList(response.data.chapters);
        })
        axios.get("http://localhost:4000/books/" + bookId). then(response => {
            setBookTitle(response.data.book._title);
        })
    }, []) 

    return (
        <>
            <div className="chapter-page-wrapper">
            <Insignia resource="Kaladin.png" /> 
            <ChapterGrid chapterList={chapterList} bookTitle = {bookTitle}/>
            <Insignia resource="Kaladin.png" /> 
            </div>
        </>
    )
}