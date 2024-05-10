import { useEffect, useState } from 'react';
import '../sortFilterChartComponent.css'
import { togglePopup } from '../utils.tsx';
import { FaExclamationCircle, FaSortAlphaDown } from 'react-icons/fa';
import { SortContent } from './sortContent.tsx';
import { PopUpTheme } from '../commonComponents/popUpTheme.tsx';
import React from 'react';
import { useGlobalState } from '../../../../../globalVariables.tsx';
import axios from 'axios';
import { SortData } from '../../../../../server/app/api/routes/mongoBooks.ts';

export const SortComponent: React.FC<{
    setSortShouldBeComputed: any
}> = ({
    setSortShouldBeComputed
}) => {
    const [sortIsOpen, setSortIsOpen] = useState(false);
    const [sortIsActive, setSortIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [sortCriteria, setSortCriteria] = useState<string>("")
    const [sortDirection, setSortDirection] = useState<number>(0)

    const {
        currentSortCriteria,
        currentSortDirection,
        refreshCurrentSortData,
        usingLocal
    } = useGlobalState()

    //setup
    useEffect(() => {
        async function useLocalData(){

        }
        async function useGlobalData(){
            const sortResult = await axios.get<{sortData: SortData}>("http://localhost:4000/mongoBooks/sort/current/data")
            setSortCriteria(sortResult.data.sortData.criteria)
            setSortDirection(sortResult.data.sortData.direction)
            setIsLoading(false);
        }
        if(usingLocal) {useLocalData()} else (useGlobalData())
    }, [])

    
    //handling sort is active 
    useEffect(() => {
        setSortIsActive(currentSortCriteria.length!=0 && (
        currentSortDirection == 1 ||
        currentSortDirection == -1 ))
    }, [currentSortCriteria, currentSortDirection])


    const onCloseSortPopup = () => {
        setSortIsOpen(false)
        async function modifyAccordingToLocalChanges() {}
        async function modifyAccordingToGlobalChanges() {
            const sortCriteriaChanged = sortCriteria.toString() != currentSortCriteria.toString();
            const sortDirectionChanged = sortDirection.toString() != currentSortDirection.toString();

            if(sortCriteriaChanged || sortDirectionChanged){
                console.log("|||||||||||||||||||||||||||| UPDATING SORT CRITERIA ||||||||||||||||||||||||||||")
                
                const result = await axios.patch("http://localhost:4000/mongoBooks/sort/current/data", {
                criteria : sortCriteria,
                direction : sortDirection
                })
                if(result.data.modifiedCount<1){ alert("SOMETHING WENT WRONG. PLESE TRY AGAIN")}
                refreshCurrentSortData();
                setSortShouldBeComputed(true);
            }
            
        }
        if(usingLocal) {modifyAccordingToLocalChanges()} else {modifyAccordingToGlobalChanges()};
    }

    return (
    <>
        <div className='sort-component-wrapper' 
        onClick={() => {
            togglePopup(sortIsOpen, setSortIsOpen);
        }}>
            <div className="tag"><p>Sort</p><FaSortAlphaDown className='sort-filter-chart-icons'/></div>
            {sortIsActive == true ?  <FaExclamationCircle className = "exclamation-mark-when-active" /> : <></>}
        </div>
        
        <PopUpTheme 
        isOpen={sortIsOpen} 
        title = "Sort"
        insigniaLeftClassName="pop-up-decoration-left-sort" 
        insigniaRightClassName="pop-up-decoration-right-sort"
        onClickAction={onCloseSortPopup} >
            
            <SortContent 
            sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}
            sortDirection={sortDirection} setSortDirection={setSortDirection}
            />
        </PopUpTheme>
    </>
    )
}