import { useEffect, useState } from 'react';
import '../sortFilterChartComponent.css'
import { togglePopup } from '../utils.tsx';
import { FaExclamationCircle, FaSortAlphaDown } from 'react-icons/fa';
import { SortContent } from './sortContent.tsx';
import { PopUpTheme } from '../commonComponents/popUpTheme.tsx';
import React from 'react';

export const SortComponent: React.FC<{
    sortCriteria: any, setSortCriteria: any,
    sortDirection: any, setSortDirection: any, 
    setSortShouldBeComputed: any

}> = ({
    sortCriteria, setSortCriteria, 
    sortDirection, setSortDirection,
    setSortShouldBeComputed
}) => {
    const [sortIsOpen, setSortIsOpen] = useState(false);
    const [thingsChanged, setThingsChanged] = useState(false);

    useEffect (() => {setThingsChanged(!(sortCriteria === ""));}, [sortCriteria, sortIsOpen])

    return (
    <>
        <div className='sort-component-wrapper' 
        onClick={() => {
            togglePopup(sortIsOpen, setSortIsOpen);
            setSortShouldBeComputed(false);
        }}>
            <div className="tag"><p>Sort</p><FaSortAlphaDown className='sort-filter-chart-icons'/></div>
            {thingsChanged == true ?  <FaExclamationCircle className = "exclamation-mark-when-active" /> : <></>}
        </div>
        <PopUpTheme isOpen={sortIsOpen} setIsOpen={setSortIsOpen} title = "Sort"
        setFunctionalityShouldBeComputed = {setSortShouldBeComputed}
        insigniaLeftClassName="pop-up-decoration-left-sort" insigniaRightClassName="pop-up-decoration-right-sort" >
            
            <SortContent 
            sortCriteria = {sortCriteria}
            setSortCriteria = {setSortCriteria}
            sortDirection = {sortDirection}
            setSortDirection = {setSortDirection}
            />
        </PopUpTheme>
    </>
    )
}