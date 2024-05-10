import { useEffect } from 'react'
import { AccordionCArdComponent } from '../acordionCardComponent/accordionCardComponent.tsx'
import { adjustAreaHeight, errorMessage, infoMessage} from '../utils.tsx'
import React from "react";
import { useNavigate } from 'react-router-dom';
import { IoListCircle } from 'react-icons/io5';
import ErrorComponent from '../../../../errorComponent.tsx';
export const ChaptersCardComponent: React.FC<{
    bookData: any
    chapters: any
    setChapters: any
    chaptersValidator: any,
    setChaptersValidator: any,
    chaptersAreaRef: any
 }> =
 ({bookData, chapters, chaptersAreaRef}) => {
        useEffect(() => {adjustAreaHeight(chaptersAreaRef);})
        const navigate = useNavigate();
        const handleExpandChapters = () => {
            navigate(`/chapters/book/${bookData._id}`, {state: {bookData}})
        }
    
        return (
            <>
            <div className = "textAreaWrapper ">
                <div className="expandable-small-editable-section-grid">
                        {chapters && chapters.length != 0 ? <><textarea className = "textAreaStyle expandable"
                            value = {chapters}
                            readOnly = {true}
                            title = "Novel chapters"
                            placeholder="Input novel chapters"
                            id = "chapters"
                            rows={1} 
                            ref={chaptersAreaRef} > 
                            </textarea></> : <>
                            <div style={{width: '100%'}}>
                            <ErrorComponent message={"Couldn't get hold of chapters!"} size={'40px'}/>
                            </div>
                            </>}
                        
                        
                    
                        <div className='expand-small-editable-section-style'>
                            <IoListCircle  className = "expand-small-editable-section"
                            onClick={handleExpandChapters}/>
                        </div>
                </div>
                <AccordionCArdComponent infoMessage={infoMessage.chapters} errorMessage={errorMessage.chapters} />
            </div>
            </>
        )
    
}