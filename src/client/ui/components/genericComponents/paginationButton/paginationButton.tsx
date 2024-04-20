import { useEffect, useState } from 'react';
import './paginationButton.css'
import { TfiAngleDoubleLeft, TfiAngleDoubleRight, TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import React from 'react';
import axios from 'axios';

export const PaginationButton: React.FC<{
    setBookList: any
    stuffChanged: any,
    setStuffChanged: any,
    searchShouldBeComputed: any,
    backendCurrentPage: any, 
    setBackendCurrentPage: any,
    maxPageNr: any
}> = ({setBookList, stuffChanged, setStuffChanged, searchShouldBeComputed, backendCurrentPage, setBackendCurrentPage, maxPageNr}) => {
    let buttonText = ""

    useEffect(() => {
        buttonText = backendCurrentPage + "/" + maxPageNr
        console.log("STUFF CHANGED PAGINATION BUTTON")
    }, [backendCurrentPage])
    
    const updateCurrentPage = (currentPage: number) => {
        axios.patch("http://localhost:4000/pagination/current", {currentPage: currentPage})
        setStuffChanged(true)
    }

    buttonText = backendCurrentPage + "/" + maxPageNr
    let noElementsFound = "No books found!"
    const handleFirst = () => {
        if (backendCurrentPage > 1){
            updateCurrentPage(1)
            setBackendCurrentPage(1)
            console.log(backendCurrentPage)
        }
    }

    const handlePrevious = () => {
        if (backendCurrentPage > 1){
            updateCurrentPage(backendCurrentPage -1)
            setBackendCurrentPage(backendCurrentPage -1 )
            console.log(backendCurrentPage)
        }
    }

    const handleNext = () => {
        if(backendCurrentPage < maxPageNr){
            updateCurrentPage(backendCurrentPage + 1)
            setBackendCurrentPage(backendCurrentPage + 1)
            console.log(backendCurrentPage)
        }
    }

    const handleLast = () => {
        if(backendCurrentPage < maxPageNr){
            updateCurrentPage(maxPageNr)
            setBackendCurrentPage(maxPageNr)
            console.log(backendCurrentPage)
        }
    }

    return(
        <>
            <div className="pagination-button-center">
                    <TfiAngleDoubleLeft className='pagination-angle'onClick={handleFirst}/>
                    <TfiAngleLeft className='pagination-angle' onClick={handlePrevious}/>
                    {maxPageNr !== 0 ? 
                    <label className = "pagination-button-label"> {buttonText} </label> 
                    : 
                    <label className='pagination-button-label'> {noElementsFound} </label>}
                    
                    <TfiAngleRight className='pagination-angle'onClick={handleNext}/>
                    <TfiAngleDoubleRight className='pagination-angle'onClick={handleLast}/>
            </div>
        </>
        
    )
}