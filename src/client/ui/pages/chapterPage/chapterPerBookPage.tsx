import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { ChapterGrid } from "../../components/chapterComponents/chapterGridComponents/chapterGrid";
import { Insignia } from "../../components/genericComponents/decor/insignia/insignia";
import './chapterPages.css'
import { ChapterNavigationComponent } from "../../components/chapterComponents/chapterNavigationComponent";
import { useGlobalState } from "../../../../globalVariables";
export const ChaptersOfBookPage: React.FC<{}> = ({}) => {
    const location = useLocation();
    const bookData = location.state.bookData;
    console.log("HELLO FROM CHAPTER GRID PAGE" + bookData)
    const bookId = bookData._id;
    const [chapterList, setChapterList] = useState([]);
    const [bookTitle, setBookTitle] = useState("")
    const {usingLocal} = useGlobalState();

    useEffect(() => {
        async function useLocalData() {
            axios.get("http://localhost:4000/chapters/" + bookId). then(response => {
                setChapterList(response.data.chapters);
            })
            axios.get("http://localhost:4000/books/" + bookId). then(response => {
                setBookTitle(response.data.book._title);
            })
        }
        async function useCloudData() {
            console.log(" -----------USING CLOUD DATA -----------")
        }
       if(usingLocal){useLocalData()} else {useLocalData()}

        
    }, []) 

    return (
        <>
            <div className="chapter-page-wrapper">
            <Insignia resource="Kaladin.png" /> 
            <ChapterNavigationComponent bookData = {bookData}/>
            <ChapterGrid chapterList={chapterList} bookData = {bookData}/>
            <Insignia resource="Kaladin.png" /> 
            </div>
        </>
    )
}