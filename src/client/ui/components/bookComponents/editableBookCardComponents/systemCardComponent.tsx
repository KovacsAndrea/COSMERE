import { useEffect } from 'react'
import { AccordionCArdComponent } from '../acordionCardComponent/accordionCardComponent.tsx'
import { adjustAreaHeightGrid, errorMessage, infoMessage, validateContent } from '../utils.tsx'

import React from "react";
import { REGEX } from '../../../../../server/core/dummyData/regex.tsx';
export const SystemCardComponent: React.FC<{
 system: any
 setSystem: any
 systemValidator: any,
 setSystemValidator: any,
 systemAreaRef: any
 planetAreaRef: any
 }> =
 ({system, setSystem, systemValidator, setSystemValidator, systemAreaRef, planetAreaRef}) => {
    const handleSystemChange = (e:any) => {setSystem(e.target.value); validateSystem()}
    useEffect(() => {adjustAreaHeightGrid(planetAreaRef, systemAreaRef); validateSystem()})
            
    const validateSystem = () => validateContent(system.toString(), REGEX.system, setSystemValidator)
    return (
        <>
            <div className="textAreaWrapper">
                <textarea className = {systemValidator === true ? "textAreaStyle" : "textAreaStyleError"}  
                    maxLength={100}
                    onChange={handleSystemChange}
                    onBlur={validateSystem}
                    value ={system}
                    title = "Novel system"
                    placeholder="Input novel system"
                    id = "system"
                    rows = {1}
                    ref = {systemAreaRef}/>
                <AccordionCArdComponent infoMessage={infoMessage.system} errorMessage={errorMessage.system}/>
            </div>
        </>
    )
}