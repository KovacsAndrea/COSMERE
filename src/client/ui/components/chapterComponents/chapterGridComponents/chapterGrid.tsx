import { ChapterCard } from "./chapterCard"

export const ChapterGrid: React.FC<{
    chapterList:any, 
    bookData: any}> = ({
        chapterList,
        bookData
    }) => {
    return(
        <>
        <div className="center">
            <div className="cardGrid">
                {chapterList.map((chapter: any) => 
                <ChapterCard 
                chapterId={chapter._id} 
                bookId={bookData._id} 
                chapterNumber={chapter._chapter_number} 
                title={chapter._title} 
                bookData = {bookData}
                description={chapter._description} 
                wordcount={chapter._wordcount} 
                pov = {chapter._pov}
                key={chapter._id + chapter._book_id + chapter._title}
                />)}
            </div>
            </div>
        </>
    )
}