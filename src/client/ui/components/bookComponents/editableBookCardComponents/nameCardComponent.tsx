import { useEffect } from "react"
import { adjustAreaHeight, errorMessage, infoMessage, validateContent } from "../utils.tsx"
import { AccordionCArdComponent } from "../acordionCardComponent/accordionCardComponent.tsx"

import React from "react";
import { REGEX } from "../../../../../server/core/dummyData/regex.tsx";
export const NameCardComponent: React.FC<{
    name: any
    setName: any
    nameValidator: any,
    setNameValidator: any,
    nameAreaRef: any
    }> =
    ({name, setName, nameValidator, setNameValidator, nameAreaRef}) => {
       const handleNameChange = (e:any) => {setName(e.target.value); validateName();}
       useEffect(() => {adjustAreaHeight(nameAreaRef), validateName()})
    
       const validateName = () => {
           validateContent(name.toString(), REGEX.title, setNameValidator)
       }
       return (
           <>
            <textarea className = {nameValidator === true ? "editTitle" : "editTitleError"}
                value = {name}
                onChange= {handleNameChange} 
                onBlur = {validateName}
                title = "Novel Title"
                placeholder="Input Novel Title"
                id = "name"
                rows={1} 
                ref={nameAreaRef} />
            <AccordionCArdComponent infoMessage={infoMessage.title} errorMessage={errorMessage.title} />
           </>
       )
   }