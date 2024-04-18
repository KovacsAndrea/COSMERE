import { useEffect } from 'react'
import { AccordionCArdComponent } from '../acordionCardComponent/accordionCardComponent.tsx'
import { adjustAreaHeight, errorMessage, infoMessage, validateContent } from '../utils.tsx'
import React from "react";
import { REGEX } from '../../../../../server/core/dummyData/regex.tsx';
export const ChaptersCardComponent: React.FC<{
 chapters: any
 setChapters: any
 chaptersValidator: any,
 setChaptersValidator: any,
 chaptersAreaRef: any
 }> =
 ({chapters, setChapters, chaptersValidator, setChaptersValidator, chaptersAreaRef}) => {
    const handleChaptersChange = (e:any) => {setChapters(e.target.value); validateChapters()}
    useEffect(() => {adjustAreaHeight(chaptersAreaRef); validateChapters()})
            
    const validateChapters = () => validateContent(chapters.toString(), REGEX.chapters, setChaptersValidator)
    return (
        <>
            <div className="textAreaWrapper">
                <textarea className = {chaptersValidator === true ? "textAreaStyle" : "textAreaStyleError"}
                    value = {chapters}
                    onChange= {handleChaptersChange} 
                    onBlur = {validateChapters}
                    title = "Novel chapters"
                    placeholder="Input novel chapters"
                    id = "chapters"
                    rows={1} 
                    ref={chaptersAreaRef} />
                <AccordionCArdComponent infoMessage={infoMessage.chapters} errorMessage={errorMessage.chapters} />
            </div>
        </>
    )
}