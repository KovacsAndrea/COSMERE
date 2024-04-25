import { useEffect} from 'react';
import './paginationButton.css'
import { TfiAngleDoubleLeft, TfiAngleDoubleRight, TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import React from 'react';
import axios from 'axios';
import { useGlobalState } from '../../../../../globalVariables';

export const PaginationButton: React.FC<{
    backendCurrentPage: any, 
    setBackendCurrentPage: any,
    maxPageNr: any
}> = ({backendCurrentPage, setBackendCurrentPage, maxPageNr}) => {
    let buttonText = ""
    const {usingLocal} = useGlobalState();
    useEffect(() => {
        async function useLocalData() {
            buttonText = backendCurrentPage + "/" + maxPageNr
            console.log("STUFF CHANGED PAGINATION BUTTON")                    
        }
        async function useCloudData() {
            console.log(" -----------USING CLOUD DATA -----------")
        }
       if(usingLocal){useLocalData()} else {useCloudData()}
        
    }, [backendCurrentPage])
    
    const updateCurrentPage = (currentPage: number) => {
        async function useLocalData() {
            axios.patch("http://localhost:4000/pagination/current", {currentPage: currentPage})
        }
        async function useCloudData() {
            console.log(" -----------USING CLOUD DATA -----------")
        }
       if(usingLocal){useLocalData()} else {useCloudData()}
        
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