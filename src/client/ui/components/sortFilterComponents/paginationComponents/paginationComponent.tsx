import { useState } from "react";
import { togglePopup } from "../utils.tsx";
import { FaBookOpen} from "react-icons/fa";
import { PopUpTheme } from "../commonComponents/popUpTheme.tsx";
import { PaginationContent } from "./paginationContent.tsx";
import React from "react";

export const PaginationComponent: React.FC<{
    paginationValue: any, 
    setPaginationValue: any, 
    paginationShouldBeComputed: any,
    setPaginationShouldBeComputed: any}> = 
    ({paginationValue, 
        setPaginationValue,
        paginationShouldBeComputed,
        setPaginationShouldBeComputed
    }) => {
    const [paginationIsOpen, setPaginationIsOpen] = useState(false)
    return (
        <>

        <div className='pagination-component-wrapper' 
        onClick = {() => 
            {togglePopup(paginationIsOpen, setPaginationIsOpen);
                setPaginationShouldBeComputed(false) 
            }}>
            <div className="tag">Pages<FaBookOpen className='sort-filter-chart-icons'/></div>
        </div>

         <PopUpTheme isOpen={paginationIsOpen} setIsOpen={setPaginationIsOpen} title = "Pagination"
        setFunctionalityShouldBeComputed={setPaginationShouldBeComputed}
        insigniaLeftClassName= "pop-up-decoration-left-pagination" insigniaRightClassName= "pop-up-decoration-right-pagination"
        >
            <PaginationContent paginationValue={paginationValue} setPaginationValue={setPaginationValue} 
            paginationShouldBeComputed = {paginationShouldBeComputed} 
            setPaginationShouldBeComputed = {setPaginationShouldBeComputed} />
        </PopUpTheme>
        </>
    );
}