import { FaRegTimesCircle} from "react-icons/fa"
import { RadioButton } from "../commonComponents/radioButton.tsx"
import React, { useEffect } from "react";
import ErrorComponent from "../../../../errorComponent.tsx";
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

    const titleCategory = "_title"
    const planetsCategory ="_planet"
    const systemsCategory = "_system"
    const shardsCategory = "_shard"
    const startDateCategory = "_startDate"
    
    let directions = [1, -1];
    const sortingIsCurrentlyDisabled = true;

    const clearSort = () => {
        setSortCriteria("");
        setSortDirection("");
    }

    useEffect(() => {console.log("FILTER CONTENT               ->>>>>>>>>>>>>>>>>> IS RENDERING")}, [])
    
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
                name = {direction} 
                category = {titleCategory} key = {direction + title} 
                sortCriteria = {sortCriteria} setSortCriteria={setSortCriteria}
                sortDirection={sortDirection} setSortDirection={setSortDirection}/>)}
                </div>
            </div>

            <div key= {planets} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {planets} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} 
                category = {planetsCategory} key = {direction + planets} 
                sortCriteria = {sortCriteria} setSortCriteria={setSortCriteria}
                sortDirection={sortDirection} setSortDirection={setSortDirection}/>)}
                </div>
            </div>

            <div key= {systems} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {systems} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} 
                category = {systemsCategory} key = {direction + systems} 
                sortCriteria = {sortCriteria} setSortCriteria={setSortCriteria}
                sortDirection={sortDirection} setSortDirection={setSortDirection}/>)}
                </div>
            </div>

            <div key= {shards} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {shards} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} 
                category = {shardsCategory} key = {direction + shards} 
                sortCriteria = {sortCriteria} setSortCriteria={setSortCriteria}
                sortDirection={sortDirection} setSortDirection={setSortDirection}/>)}
                </div>
            </div>

            <div key= {startDate} className = "filter-grid-column">
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {startDate} </label>
                    <FaRegTimesCircle className="cool-check-uncheck-icons" onClick={clearSort}/>
                </div>
                <div className="design-for-option-column">
                {directions.map( direction => <RadioButton
                name = {direction} 
                category = {startDateCategory} key = {direction + startDate} 
                sortCriteria = {sortCriteria} setSortCriteria={setSortCriteria}
                sortDirection={sortDirection} setSortDirection={setSortDirection}/>)}
                </div>
            </div>

            {sortingIsCurrentlyDisabled ? <><ErrorComponent message={"Sorting is currently disabled!"} size={'40px'}/></> : <></>}
            
        </div>
        </>
    )
}