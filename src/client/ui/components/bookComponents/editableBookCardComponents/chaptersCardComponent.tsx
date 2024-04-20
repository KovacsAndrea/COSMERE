import { useEffect } from 'react'
import { AccordionCArdComponent } from '../acordionCardComponent/accordionCardComponent.tsx'
import { adjustAreaHeight, errorMessage, infoMessage, validateContent } from '../utils.tsx'
import React from "react";
import { REGEX } from '../../../../../server/core/dummyData/regex.tsx';
import { Link } from 'react-router-dom';
export const ChaptersCardComponent: React.FC<{
bookId: any
 chapters: any
 setChapters: any
 chaptersValidator: any,
 setChaptersValidator: any,
 chaptersAreaRef: any
 }> =
 ({bookId, chapters, setChapters, chaptersValidator, setChaptersValidator, chaptersAreaRef}) => {
    const handleChaptersChange = (e:any) => {setChapters(e.target.value); validateChapters()}
    useEffect(() => {adjustAreaHeight(chaptersAreaRef); validateChapters()})
            
    const validateChapters = () => validateContent(chapters.toString(), REGEX.chapters, setChaptersValidator)
    return (
        <>
            <div className="textAreaWrapper">
                <textarea className = "textAreaStyle"
                    value = {chapters}
                    readOnly = {true}
                    title = "Novel chapters"
                    placeholder="Input novel chapters"
                    id = "chapters"
                    rows={1} 
                    ref={chaptersAreaRef} > </textarea>
                    <div className='details-button-expand-chapters'>
                        <Link to ={`/chapters/book/${bookId}`}
                            state={bookId}>
                            <button className='discardButton'>Details</button>
                        </Link>
                    
                    </div>
                <AccordionCArdComponent infoMessage={infoMessage.chapters} errorMessage={errorMessage.chapters} />
            </div>
        </>
    )
}