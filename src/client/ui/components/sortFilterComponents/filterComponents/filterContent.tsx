import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { CheckboxButton } from "../commonComponents/checkboxButton.tsx";
import React, { useEffect } from "react";
import ErrorComponent from "../../../../errorComponent.tsx";
import LoadingComponent from "../../loadingComponent/loadingComponent.tsx";

export const FilterContent: React.FC<{
    //the unique sets
    planetData: string[];
    systemData: string[];
    shardData: string[];
    dateData: number[];

    //the current selected data set, on which we'll make changes
    //on close pupup we update the changes
    currentPlanetData: string[];
    setCurrentPlanetData: React.Dispatch<React.SetStateAction<string[]>>;
    currentSystemData: string[];
    setCurrentSystemData: React.Dispatch<React.SetStateAction<string[]>>;
    currentShardData: string[];
    setCurrentShardData: React.Dispatch<React.SetStateAction<string[]>>;
    currentDateData: number[];
    setCurrentDateData: React.Dispatch<React.SetStateAction<number[]>>;
    isLoading: boolean;
}> 
= ({ planetData,
    systemData,
    shardData,
    dateData,
    currentPlanetData,
    setCurrentPlanetData,
    currentSystemData,
    setCurrentSystemData,
    currentShardData,
    setCurrentShardData,
    currentDateData,
    setCurrentDateData,
    isLoading}) => {

    const planets ="planets"
    const systems = "systems"
    const shards = "shards"
    const startDate = "dates"

    if (isLoading) {
        return <LoadingComponent />;
    }

    useEffect(() => {console.log("FILTER CONTENT               ->>>>>>>>>>>>>>>>>> IS RENDERING")}, [])

    const checkAllPlanets = () => {setCurrentPlanetData(planetData)}
    const unCheckAllPlanets = () => {setCurrentPlanetData([])}

    const checkAllSystems = () => {setCurrentSystemData(systemData)}
    const unCheckAllSystems = () => {setCurrentSystemData([])}
    
    const checkAllShards = () => {setCurrentShardData(shardData)}
    const unCheckAllShards = () => {setCurrentShardData([])}
    
    const checkAllDates = () => {setCurrentDateData(dateData);}  
    const unCheckAllDates = () => {setCurrentDateData([])}
    
    return (
        <>
        <div className="filter-grid">

            {/* PLANETS */}
            <div key= {planets} className = "filter-grid-column">
                {/* HEADER */}
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {planets} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" onClick={checkAllPlanets}/>
                    <FaRegCheckSquare className="cool-check-uncheck-icons" onClick={unCheckAllPlanets}/> 
                </div>
                {/* CONTENT */}
                <div className="design-for-option-column">
                    {planetData != null ? 
                    <>{planetData.map( planet => <CheckboxButton
                            name = {planet} 
                            category = {planets} 
                            key = {planet + "PLANET"} 
                            selectedStuff = {currentPlanetData} 
                            setSelectedStuff = {setCurrentPlanetData}/>)}</> :
                    <>
                    <ErrorComponent message= {"Couldn't get hold of the planet data!"} size={'40px'}/>
                    </>}
                </div>
            </div>

            {/* SYSTEMS */}
            <div key = {systems} className = "filter-grid-column">
                {/* HEADER */}
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {systems} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" onClick={checkAllSystems}/>
                    <FaRegCheckSquare className="cool-check-uncheck-icons" onClick={unCheckAllSystems}/> 
                </div>
                {/* CONTENT */}
                <div className="design-for-option-column">
                    {systemData != null ?
                    <>{systemData.map( system => <CheckboxButton 
                        name = {system } 
                        category = {systems} 
                        key = {system + "SYSTEM"} 
                        selectedStuff={currentSystemData} 
                        setSelectedStuff={setCurrentSystemData} />)}</> : 
                    <><ErrorComponent message= {"Couldn't get hold of the system data!"} size={'40px'}/></>
                    }
                </div>
            </div>

            {/* SHARDS */}
            <div key = {shards} className = "filter-grid-column">
                {/* HEADER */}
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {shards} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" onClick={checkAllShards}/>
                    <FaRegCheckSquare className="cool-check-uncheck-icons" onClick={unCheckAllShards}/> 
                </div>
                {/* CONTENT */}
                <div className="design-for-option-column">
                    {shardData != null ? 
                    <>{shardData.map( shard => <CheckboxButton
                        name = {shard } 
                        category = {shards} 
                        key = {shard + "SHARD"} 
                        selectedStuff={currentShardData} 
                        setSelectedStuff={setCurrentShardData} />)}</> : 
                    <><ErrorComponent message= {"Couldn't get hold of the Shard data!"} size={'40px'}/></>}
                </div>
            </div>

            {/* DATES */}
            <div key = {startDate} className = "filter-grid-column">
                {/* HEADER */}
                <div className = "filter-column-header">
                    <label className="title-for-filter-category"> {startDate} </label>
                    <FaCheckSquare className="cool-check-uncheck-icons" onClick={checkAllDates}/>
                    <FaRegCheckSquare className="cool-check-uncheck-icons" onClick={unCheckAllDates}/> 
                </div>
                {/* CONTENT */}
                <div className="design-for-option-column">
                    {dateData != null ? 
                    <> {dateData.map( date => <CheckboxButton
                        name = {date} 
                        category = {startDate} 
                        key = {date + "DATE"} 
                        selectedStuff={currentDateData} 
                        setSelectedStuff={setCurrentDateData} />)}</> : 
                    <><ErrorComponent message= {"Couldn't get hold of the Date data!"} size={'40px'}/></>}
               </div>
            </div>

        </div>
        </>
    );
}


