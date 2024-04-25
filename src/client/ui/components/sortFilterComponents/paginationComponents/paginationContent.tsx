import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { useGlobalState } from '../../../../../globalVariables';
import ErrorComponent from '../../../../errorComponent';
export const PaginationContent: React.FC<{ 
    paginationValue: any, 
    setPaginationValue: any,
    paginationShouldBeComputed: any,
    setPaginationShouldBeComputed: any
}> = ({}) => {
    const {usingLocal} = useGlobalState();
    const [backendPaginationValue, setBackendPaginationValue] = useState(0);
    const paginationCurrentlyDisabled = true;
    useEffect(() => {
        async function useLocalData() {
            axios.get("http://localhost:4000/pagination/").then( response => {
                setBackendPaginationValue(response.data.elementsPerPage)
            })
                    
        }
        async function useCloudData() {
            console.log(" -----------USING CLOUD DATA -----------")
        }
       
        if(usingLocal){useLocalData()} else {useCloudData()}
    }, )

    const handleChoice = (value: number) => {
		async function useLocalData() {
            axios.patch("http://localhost:4000/pagination/", {elementsPerPage: value})
            axios.patch("http://localhost:4000/pagination/current", {currentPage: 1})
            setBackendPaginationValue(value)
            console.log(value)
            console.log(1)
        }
        async function useCloudData() {
            console.log(" -----------USING CLOUD DATA -----------")
        }
        if(usingLocal){useLocalData()} else {useCloudData()}
    }
    
    const onChange = () => {

    }

    const possibleValues = [9, 15, 30]

    return (
        <>
        <div className = "filter-grid">
            
            <div className="filter-grid-column">
                <label className="title-for-filter-category"> Elements Per Page </label>                    
                <div className="design-for-option-column">
                    {possibleValues.map(paginationValue =>
                        <div className="checkable-option-for-filter-button" key={paginationValue}>
                            <input type="radio" name="Values" 
                            key = {paginationValue.toString() + "PAG"} 
                            value={paginationValue}  
                            className = "stilu-lu-vasile" 
                            checked = {backendPaginationValue === paginationValue}
                            onClick={() => handleChoice(paginationValue)} 
                            onChange={() => onChange}/>
                            <label htmlFor={paginationValue.toString()} className="stilu-lu-vasile-da-ptr-label"> {paginationValue} </label>
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