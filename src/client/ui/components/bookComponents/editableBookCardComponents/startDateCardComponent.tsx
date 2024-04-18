import { useEffect } from 'react'
import { AccordionCArdComponent } from '../acordionCardComponent/accordionCardComponent.tsx'
import { adjustAreaHeightGrid, errorMessage, infoMessage, validateContent } from '../utils.tsx'

import React from "react";
import { REGEX } from '../../../../../server/core/dummyData/regex.tsx';
export const StartDateCardComponent: React.FC<{
 startDate: any
 setStartDate: any
 startDateValidator: any,
 setStartDateValidator: any,
 startDateAreaRef: any
 shardAreaRef: any
 }> =
 ({startDate, setStartDate, startDateValidator, setStartDateValidator, startDateAreaRef, shardAreaRef}) => {
    const handleStartDateChange = (e:any) => {setStartDate(e.target.value); validateStartDate()}
    useEffect(() => {adjustAreaHeightGrid(shardAreaRef, startDateAreaRef); validateStartDate()})
            
    const validateStartDate = () => validateContent(startDate.toString(), REGEX.startDate, setStartDateValidator)
    return (
        <>
            <div className="textAreaWrapper">
                <textarea className = {startDateValidator === true ? "textAreaStyle" : "textAreaStyleError"}  
                    maxLength={100}
                    onChange={handleStartDateChange}
                    onBlur={validateStartDate}
                    value ={startDate}
                    title = "Novel year"
                    placeholder="Input novel year"
                    id = "startDate"
                    rows = {1}
                    ref = {startDateAreaRef}/>
                <AccordionCArdComponent infoMessage={infoMessage.startDate} errorMessage={errorMessage.startDate}/>
            </div>
        </>
    )
}