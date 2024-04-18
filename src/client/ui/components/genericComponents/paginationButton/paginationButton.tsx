import { useEffect, useState } from 'react';
import './paginationButton.css'
import { TfiAngleDoubleLeft, TfiAngleDoubleRight, TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import React from 'react';
import axios from 'axios';

export const PaginationButton: React.FC<{
    setBookList: any
    stuffChanged: any,
    setStuffChanged: any
}> = ({setBookList, stuffChanged, setStuffChanged}) => {
    let buttonText = ""

    
    const [backendCurrentPage, setBackendCurrentPage] = useState(1);
    const [maxPageNr, setMaxPageNr] = useState(1);
    useEffect(() => {
        axios.get("http://localhost:4000/pagination/current").then( response => {
            setBackendCurrentPage(response.data.currentPage)
        })
        axios.get("http://localhost:4000/pagination/max").then( response => {
            setMaxPageNr(response.data.maxPage)
        })
        axios.get("http://localhost:4000/books/search/NONE").then( response => {
        setBookList(response.data.books);
        }).catch (error => {
        console.error('Error fetching backend data:', error);
        })
        setStuffChanged(false)
        console.log("STUFF CHANGED PAGINATION BUTTON")
    }, [stuffChanged])
    // if(paginationNumber < availableElements){
    //     buttonText = "Show More"
    // } else{
    //     buttonText = "Show Less"
    // }
    // const buttonMessage = buttonText + " " +  number;
    
    // useEffect(() => {
    //     rafoServ.elementsPerPage = paginationValue
    //     console.log(paginationValue + " haaaaaaaaaaaaaaaaaaa din buton")
    // }, [paginationValue])
    const updateCurrentPage = (currentPage: number) => {
        axios.patch("http://localhost:4000/pagination/current", {currentPage: currentPage})
        setStuffChanged(true)
    }

    buttonText = backendCurrentPage + "/" + maxPageNr
    const handleFirst = () => {
        if (backendCurrentPage !== 1){
            updateCurrentPage(1)
            setBackendCurrentPage(1)
            console.log(backendCurrentPage)
        }
    }

    const handlePrevious = () => {
        if (backendCurrentPage !== 1){
            updateCurrentPage(backendCurrentPage -1)
            setBackendCurrentPage(backendCurrentPage -1 )
            console.log(backendCurrentPage)
        }
    }

    const handleNext = () => {
        if(backendCurrentPage !== maxPageNr){
            updateCurrentPage(backendCurrentPage + 1)
            setBackendCurrentPage(backendCurrentPage + 1)
            console.log(backendCurrentPage)
        }
    }

    const handleLast = () => {
        if(backendCurrentPage !== maxPageNr){
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
                    <label className = "pagination-button-label"> {buttonText} </label>
                    <TfiAngleRight className='pagination-angle'onClick={handleNext}/>
                    <TfiAngleDoubleRight className='pagination-angle'onClick={handleLast}/>
            </div>
        </>
        
    )
}