import { FaRegTimesCircle} from "react-icons/fa"
import { RadioButton } from "../commonComponents/radioButton.tsx"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendPath } from "../../../../../App.tsx";
export const SortContent: React.FC <{
    sortCriteria: any, setSortCriteria: any,
    sortDirection: any, setSortDirection: any
}> = ({
    sortCriteria, setSortCriteria, 
    sortDirection, setSortDirection, }) => {
    
    const title = "Title"
    const planets ="Planets"
    const systems = "Systems"
    const shards = "Shards"
    const startDate = "Dates"
    
    let directions = ["Ascending", "Descending"];

    const [backendSortDirection, setBackendSortDirection] = useState("")
    const [backendSortCriteria, setBackendSortCriteria] = useState("")

    useEffect(() => {
        axios.get("http://localhost:4000/sort/criteria").then( response => {
            console.log("AM LUAT SORT CRITERIA" + response.data.sortCriteria)
            setBackendSortCriteria(response.data.sortCriteria)
        }).catch( error => {
            console.error("Failed to fetch sort criteria " + error)
        })

        axios.get("http://localhost:4000/sort/direction").then( response => {
            console.log("AM LUAT SORT DIRECTION")
            setBackendSortDirection(response.data.sortDirection)
        }).catch( error => {console.error("Failed to fetch sort direction", error)})
    }, [])

    const clearSort = () => {
        setSortCriteria("");
        setSortDirection("");
    }
    
    return (
        <>
        <div className="filter-grid">
            <div key= {title} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {title} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} category = {title} key = {direction + title} 
                sortCriteria = {backendSortCriteria} setSortCriteria={setBackendSortCriteria}
                sortDirection={backendSortDirection} setSortDirection={setBackendSortDirection}/>)}
                </div>
            </div>

            <div key= {planets} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {planets} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} category = {planets} key = {direction + planets} 
                sortCriteria = {backendSortCriteria} setSortCriteria={setBackendSortCriteria}
                sortDirection={backendSortDirection} setSortDirection={setBackendSortDirection}/>)}
                </div>
            </div>

            <div key= {systems} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {systems} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} category = {systems} key = {direction + systems} 
                sortCriteria = {backendSortCriteria} setSortCriteria={setBackendSortCriteria}
                sortDirection={backendSortDirection} setSortDirection={setBackendSortDirection}/>)}
                </div>
            </div>

            <div key= {shards} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {shards} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} category = {shards} key = {direction + shards} 
                sortCriteria = {backendSortCriteria} setSortCriteria={setBackendSortCriteria}
                sortDirection={backendSortDirection} setSortDirection={setBackendSortDirection}/>)}
                </div>
            </div>

            <div key= {startDate} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {startDate} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} category = {startDate} key = {direction + startDate} 
                sortCriteria = {backendSortCriteria} setSortCriteria={setBackendSortCriteria}
                sortDirection={backendSortDirection} setSortDirection={setBackendSortDirection}/>)}
                </div>
            </div>
            
        </div>
        </>
    )
}