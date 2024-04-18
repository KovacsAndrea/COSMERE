import { useEffect } from 'react'
import { AccordionCArdComponent } from '../acordionCardComponent/accordionCardComponent.tsx'
import { adjustAreaHeight, errorMessage, infoMessage, validateContent } from '../utils.tsx'
import React from "react";
import { REGEX } from '../../../../../server/core/dummyData/regex.tsx';
export const DescriptionCardComponent: React.FC<{
 description: any
 setDescription: any
 descriptionValidator: any,
 setDescriptionValidator: any,
 descriptionAreaRef: any
 }> =
 ({description, setDescription, descriptionValidator, setDescriptionValidator, descriptionAreaRef}) => {
    const handleDescriptionChange = (e:any) => {setDescription(e.target.value); validateDescription()}
    useEffect(() => {adjustAreaHeight(descriptionAreaRef); validateDescription()})
            
    const validateDescription = () => {
        validateContent(description.toString(), REGEX.description, setDescriptionValidator)
    }
    return (
        <>
            <div className="textAreaWrapper">
                <textarea className = {descriptionValidator === true ? "textAreaStyle" : "textAreaStyleError"}
                    value = {description}
                    onChange= {handleDescriptionChange} 
                    onBlur = {validateDescription}
                    title = "Novel description"
                    placeholder="Input novel description"
                    id = "description"
                    rows={1} 
                    ref={descriptionAreaRef} />
                <AccordionCArdComponent infoMessage={infoMessage.description} errorMessage={errorMessage.description} />
            </div>
        </>
    )
}