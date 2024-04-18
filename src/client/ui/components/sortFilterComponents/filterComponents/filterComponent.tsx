import { useEffect, useState } from 'react';
import '../sortFilterChartComponent.css'
import { togglePopup } from '../utils.tsx';
import { FaExclamationCircle, FaFilter } from 'react-icons/fa';
import { FilterContent } from './filterContent.tsx';
import { PopUpTheme } from '../commonComponents/popUpTheme.tsx';
import React from 'react';

export const FilterComponent: React.FC<{ 
    selectedPlanets: any, setSelectedPlanets: any
    selectedSystems: any, setSelectedSystems: any,
    selectedShards: any, setSelectedShards: any,
    selectedDates: any, setSelectedDates: any
    setFilterShouldBeComputed: any
}> = 
({
    selectedPlanets, setSelectedPlanets,
    selectedSystems, setSelectedSystems,
    selectedShards, setSelectedShards,
    selectedDates, setSelectedDates,
    setFilterShouldBeComputed
}) => {
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [thingsChanged, setThingsChanged] = useState(false);

    useEffect(() => {
        let planets: string[] = selectedPlanets;
        let systems: string[] = selectedSystems;
        let shards: string[] = selectedShards;
        let dates: string[] = selectedDates;
        setThingsChanged (!(
            planets.length === 0 &&
            systems.length === 0 &&
            shards.length === 0 &&
            dates.length ===0
        ))
    }, [selectedPlanets, selectedSystems, selectedShards, selectedDates, filterIsOpen])

    return (
    <>
        <div className='filter-component-wrapper' 
        onClick = {() => {
            togglePopup(filterIsOpen, setFilterIsOpen); 
            setFilterShouldBeComputed(false); 
            }}>
            <span className="tag">Filter <FaFilter className='sort-filter-chart-icons'/></span>
            {thingsChanged == true ?  <FaExclamationCircle className = "exclamation-mark-when-active" /> : <></>}

        </div>
        
        <PopUpTheme isOpen={filterIsOpen} setIsOpen={setFilterIsOpen} title = "Filter"
        setFunctionalityShouldBeComputed = {setFilterShouldBeComputed}
        insigniaLeftClassName= "pop-up-decoration-left" insigniaRightClassName= "pop-up-decoration-right"
        >
            <FilterContent 
            selectedPlanets={selectedPlanets} setSelectedPlanets={setSelectedPlanets}
            selectedSystems={selectedSystems} setSelectedSystems={setSelectedSystems}
            selectedShards={selectedShards} setSelectedShards={setSelectedShards}
            selectedDates={selectedDates} setSelectedDates={setSelectedDates}
            />
        </PopUpTheme>
    </>
    )
}