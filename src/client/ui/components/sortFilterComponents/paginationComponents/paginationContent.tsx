import React from 'react';
import { useGlobalState } from '../../../../../globalVariables';
import ErrorComponent from '../../../../errorComponent';
export const PaginationContent: React.FC<{ 
    paginationValue: any, 
    setPaginationValue: any,
    possibleValues: number[]
}> = ({paginationValue, setPaginationValue, possibleValues}) => {
    const {usingLocal} = useGlobalState();
    
    const paginationCurrentlyDisabled = false;
    
    const handleChoice = (value: number) => {
		async function useLocalData() {
        }
        async function useCloudData() {
            setPaginationValue(value)
        }
        if(usingLocal){useLocalData()} else {useCloudData()}
    }


    return (
        <>
        <div className = "filter-grid">
            
            <div className="filter-grid-column">
                <label className="title-for-filter-category"> Elements Per Page </label>                    
                <div className="design-for-option-column">
                    {possibleValues.map(paginationOption =>
                        <div className="checkable-option-for-filter-button" key={paginationOption}>
                            <input type="radio" name="Values" 
                            key = {paginationOption.toString() + "PAG"} 
                            value={paginationOption}  
                            className = "stilu-lu-vasile" 
                            checked = {paginationValue === paginationOption}
                            onClick={() => handleChoice(paginationOption)} 
                            onChange={() => {}}/>
                            <label htmlFor={paginationOption.toString()} className="stilu-lu-vasile-da-ptr-label"> {paginationOption} </label>
                        </div>
                        )}
                </div>
            </div>
            {paginationCurrentlyDisabled ? 
            <><ErrorComponent message={"Pagination is currently disabled!"}/></> : 
            <><div className="filter-grid-column-insignia"></div></>}
            
            
        </div>
        </>
    )
}