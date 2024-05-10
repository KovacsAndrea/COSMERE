import { useEffect, useState} from 'react';
import './paginationButton.css'
import { TfiAngleDoubleLeft, TfiAngleDoubleRight, TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import React from 'react';
import axios from 'axios';
import { useGlobalState } from '../../../../../globalVariables';

export const PaginationButton: React.FC<{}> = ({}) => {
    const {usingLocal, 
        currentPage, 
        refreshCurrentPage, 
        updateCurrentPage, 
        currentElementsPerPage,
        mongoBookList} = useGlobalState();
    const [maxPageNr, setMaxPageNr] = useState(0)
    const [buttonText, setButtonText] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function useLocalData() {
            setButtonText(currentPage + "/" + maxPageNr)
            console.log("STUFF CHANGED PAGINATION BUTTON")                    
        }
        async function useCloudData() {
            setButtonText(currentPage.toString() + "/" + maxPageNr.toString());
            setIsLoading(false);
        }
       if(usingLocal){useLocalData()} else {useCloudData()}
        
    }, [currentPage, maxPageNr])
    
    useEffect(() => {
        console.log("PAGINATION DETECTED THAT BOOKLIST CHANGED")
        setMaxPageNr(mongoBookList.length)
    }, [mongoBookList])

    const handleCurrentPageChange = (currentPage: number) => {
        async function useLocalData() {
            axios.patch("http://localhost:4000/pagination/current", {currentPage: currentPage})
        }
        async function useCloudData() {
            updateCurrentPage(currentPage)
            refreshCurrentPage();
        }
       if(usingLocal){useLocalData()} else {useCloudData()}
        
    }

    const handleFirst = () => {
        if (currentPage > 1){
            handleCurrentPageChange(1)
            console.log(currentPage)
        }
    }

    const handlePrevious = () => {
        if (currentPage > 1){
            handleCurrentPageChange(currentPage -1 )
            console.log(currentPage)
        }
    }

    const handleNext = () => {
        if(currentPage < maxPageNr){
            handleCurrentPageChange(currentPage + 1)
            console.log(currentPage)
        }
    }

    const handleLast = () => {
        if(currentPage < maxPageNr){
            handleCurrentPageChange(maxPageNr)
            console.log(currentPage)
        }
    }

    return(
        <>
            <div className="pagination-button-center">
                    <TfiAngleDoubleLeft className='pagination-angle'onClick={handleFirst}/>
                    <TfiAngleLeft className='pagination-angle' onClick={handlePrevious}/>
                    {isLoading ? 
                    <label className = "pagination-button-label"> ... </label> 
                    : 
                    <label className='pagination-button-label'> {buttonText} </label>}
                    
                    <TfiAngleRight className='pagination-angle'onClick={handleNext}/>
                    <TfiAngleDoubleRight className='pagination-angle'onClick={handleLast}/>
            </div>
        </>
        
    )
}