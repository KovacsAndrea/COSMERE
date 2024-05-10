import React, { useEffect } from 'react'
import { ChartComponent } from './chartComponents/chartComponent.tsx'
import { FilterComponent } from './filterComponents/filterComponent.tsx'
import { PaginationComponent } from './paginationComponents/paginationComponent.tsx'
import { SortComponent } from './sortComponents/sortComponent.tsx'
import './sortFilterChartComponent.css'

export const UtilitiesComponent: React.FC<{
    setFilterShouldBeComputed: any
    setSortShouldBeComputed: any,
    setPaginationShouldBeComputed: any,
}> = ({
    setFilterShouldBeComputed,
    setSortShouldBeComputed,
    setPaginationShouldBeComputed
}) => {
    useEffect(() => {console.log("FILTER CONTENT               ->>>>>>>>>>>>>>>>>> IS RENDERING")}, [])
    return (
    <>
    <div className='sort-filter-component-wrapper'>
        <SortComponent 
        setSortShouldBeComputed = {setSortShouldBeComputed}
        />
        <FilterComponent 
        setFilterShouldBeComputed = {setFilterShouldBeComputed}
        />
        <ChartComponent  />
        <PaginationComponent 
        setPaginationShouldBeComputed = {setPaginationShouldBeComputed}/>
    </div>
    </>
    )
}