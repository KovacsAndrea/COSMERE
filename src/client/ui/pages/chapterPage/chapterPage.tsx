import { ChapterCard } from "../../components/chapterComponents/chapterGridComponents/chapterCard"
import { ChapterGrid } from "../../components/chapterComponents/chapterGridComponents/chapterGrid"
import { Insignia } from "../../components/genericComponents/decor/insignia/insignia"

export const ChapterPage: React.FC<{chapterList: any, setChapterList: any}> = ({chapterList, setChapterList}) => {
    console.log(chapterList)
    return (
        <>
            <Insignia resource="Kaladin.png" /> 
           
            
            <Insignia resource="Kaladin.png" /> 
        </>
    )
}