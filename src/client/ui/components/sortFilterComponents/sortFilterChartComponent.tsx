import React from 'react'
import { ChartComponent } from './chartComponents/chartComponent.tsx'
import { FilterComponent } from './filterComponents/filterComponent.tsx'
import { PaginationComponent } from './paginationComponents/paginationComponent.tsx'
import { SortComponent } from './sortComponents/sortFunctionality.tsx'
import './sortFilterChartComponent.css'

export const UtilitiesComponent: React.FC<{
    selectedPlanets: any, setSelectedPlanets: any,
    selectedSystems: any, setSelectedSystems: any,
    selectedShards: any, setSelectedShards: any,
    selectedDates: any, setSelectedDates: any,
    setFilterShouldBeComputed: any
    sortCriteria: any, setSortCriteria: any,
    sortDirection: any, setSortDirection: any, 
    setSortShouldBeComputed: any,
    paginationValue: any,
    setPaginationValue: any
    paginationShouldBeComputed: any,
    setPaginationShouldBeComputed: any,
}> = ({
    selectedPlanets, setSelectedPlanets,
    selectedSystems, setSelectedSystems,
    selectedShards, setSelectedShards,
    selectedDates, setSelectedDates,
    setFilterShouldBeComputed,
    sortCriteria, setSortCriteria, 
    sortDirection, setSortDirection,
    setSortShouldBeComputed,
    paginationValue, setPaginationValue,
    paginationShouldBeComputed, setPaginationShouldBeComputed
}) => {
    return (
    <>
    <div className='sort-filter-component-wrapper'>
        <SortComponent 
        sortCriteria = {sortCriteria} setSortCriteria = {setSortCriteria}
        sortDirection = {sortDirection} setSortDirection = {setSortDirection}
        setSortShouldBeComputed = {setSortShouldBeComputed}
        />
        <FilterComponent 
        selectedPlanets = {selectedPlanets} setSelectedPlanets = {setSelectedPlanets}
        selectedSystems={selectedSystems} setSelectedSystems={setSelectedSystems}
        selectedShards={selectedShards} setSelectedShards={setSelectedShards}
        selectedDates={selectedDates} setSelectedDates={setSelectedDates}
        setFilterShouldBeComputed = {setFilterShouldBeComputed}
        />
        <ChartComponent  />
        <PaginationComponent 
        paginationValue={paginationValue} 
        setPaginationValue={setPaginationValue}
        paginationShouldBeComputed = {paginationShouldBeComputed}
        setPaginationShouldBeComputed = {setPaginationShouldBeComputed}/>
    </div>
    </>
    )
}