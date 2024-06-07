import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { ChapterGrid } from "../../components/chapterComponents/chapterGridComponents/chapterGrid";
import { Insignia } from "../../components/genericComponents/decor/insignia/insignia";
import './chapterPages.css'
import { ChapterNavigationComponent } from "../../components/chapterComponents/chapterNavigationComponent";
import { useGlobalState } from "../../../../globalVariables";
export const ChaptersOfBookPage: React.FC<{}> = ({}) => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const bookData = location.state.bookData;
    console.log("HELLO FROM CHAPTER GRID PAGE" + bookData)
    const bookId = bookData._id;
    const [chapterList, setChapterList] = useState([]);
    const {usingLocal} = useGlobalState();
    const [chapterWasDeleted, setChapterWasDeleted] = useState(false)

    useEffect(() => {
        async function useLocalData() {
            
        }
        async function useCloudData() {
            axios.get("http://localhost:4000/mongoChapters/" + bookId, {headers: {Authorization: `Bearer ${token}`}}). then(response => {
                setChapterList(response.data.chaptersOfBook);
            })
        }
       if(usingLocal){useLocalData()} else {useCloudData()}

        
    }, []) 

    useEffect(() => {
        console.log(chapterWasDeleted)
        if(chapterWasDeleted){
            axios.get("http://localhost:4000/mongoChapters/" + bookId, {headers: {Authorization: `Bearer ${token}`}}). then(response => {
                setChapterList(response.data.chaptersOfBook);
            })
            setChapterWasDeleted(false)
        }
    }, [chapterWasDeleted])

    return (
        <>
            <div className="chapter-page-wrapper">
            <Insignia resource="Kaladin.png" /> 
            <ChapterNavigationComponent bookData = {bookData}/>
            <ChapterGrid chapterList={chapterList} bookData = {bookData} setChapterWasDeleted = {setChapterWasDeleted}/>
            <Insignia resource="Kaladin.png" /> 
            </div>
        </>
    )
}