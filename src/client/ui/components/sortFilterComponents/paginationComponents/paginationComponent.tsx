import { useEffect, useState } from "react";
import { togglePopup } from "../utils.tsx";
import { FaBookOpen} from "react-icons/fa";
import { PopUpTheme } from "../commonComponents/popUpTheme.tsx";
import { PaginationContent } from "./paginationContent.tsx";
import React from "react";
import { useGlobalState } from "../../../../../globalVariables.tsx";

export const PaginationComponent: React.FC<{
    setPaginationShouldBeComputed: any}> = 
    ({
        setPaginationShouldBeComputed
    }) => {
    
    const {
        currentElementsPerPage,
        updateCurrentElementsPerPage
    } = useGlobalState()
    const [paginationIsOpen, setPaginationIsOpen] = useState(false)
    const [elementsPerPage, setElementsPerPage] = useState(currentElementsPerPage)
    const possibleValues = [9, 15, 30]
    
    useEffect(() => {
        setElementsPerPage(currentElementsPerPage)
    }, [currentElementsPerPage])
    
    const onClosePaginationPopup = () => {
        setPaginationIsOpen(false)
        console.log("ELEMENTS PER PAGE " +elementsPerPage)
        console.log("CURRENT ELEMENTS PER PAGE " + currentElementsPerPage)
        if(currentElementsPerPage != elementsPerPage){
            if(possibleValues.includes(elementsPerPage)){
                console.log("||||||||||||||||||||||||| UPDATING THE PAGINATION CRITERIA |||||||||||||||||||||||||")
                updateCurrentElementsPerPage(elementsPerPage);
                setPaginationShouldBeComputed(true)
            }
        }
    }

    return (
        <>

        <div className='pagination-component-wrapper' 
        onClick = {() => 
            {togglePopup(paginationIsOpen, setPaginationIsOpen);
            }}>
            <div className="tag">Pages<FaBookOpen className='sort-filter-chart-icons'/></div>
        </div>

         <PopUpTheme 
         isOpen={paginationIsOpen} 
         title = "Pagination"
        insigniaLeftClassName= "pop-up-decoration-left-pagination" 
        insigniaRightClassName= "pop-up-decoration-right-pagination"
        onClickAction={onClosePaginationPopup}
        >
            <PaginationContent 
            paginationValue={elementsPerPage} 
            setPaginationValue={setElementsPerPage}
            possibleValues = {possibleValues} />
        </PopUpTheme>
        </>
    );
}