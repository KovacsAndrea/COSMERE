import { BookGrid } from "../../components/bookComponents/bookGridComponents/bookTable.tsx"
import './mainPage.css'
import { AddButton } from "../../components/genericComponents/addButton/addButton.tsx";
import { FooterBanner } from "../../components/genericComponents/decor/footer/footerBanner.tsx";
import { IntroBanner } from "../../components/genericComponents/decor/header/introBanner.tsx";
import { Insignia } from "../../components/genericComponents/decor/insignia/insignia.tsx";

import { UtilitiesComponent } from "../../components/sortFilterComponents/sortFilterChartComponent.tsx";

import { ConnectionStatus } from "../../components/genericComponents/connectionStatus/connectionStatus.tsx";
import { useGlobalState } from "../../../../globalVariables.tsx";


// Usage

export const MainPage: React.FC<{ searchText: any,  
    searchShouldBeComputed: any,
    selectedPlanets: any, setSelectedPlanets: any,
    selectedSystems: any, setSelectedSystems: any,
    selectedShards: any, setSelectedShards: any,
    selectedDates: any, setSelectedDates: any,
    filterShouldBeComputed: any, setFilterShouldBeComputed: any,
    sortCriteria: any, setSortCriteria: any,
    sortDirection: any, setSortDirection: any, 
    sortShouldBeComputed: any, setSortShouldBeComputed: any
    paginationValue: any, setPaginationValue: any
    paginationShouldBeComputed: any, setPaginationShouldBeComputed: any,
}> = 
    ({searchText, searchShouldBeComputed,
    selectedPlanets, setSelectedPlanets,
    selectedSystems, setSelectedSystems,
    selectedShards, setSelectedShards,
    selectedDates, setSelectedDates,
    filterShouldBeComputed, setFilterShouldBeComputed,
    sortCriteria, setSortCriteria, 
    sortDirection, setSortDirection,
    sortShouldBeComputed, setSortShouldBeComputed,
    paginationValue, setPaginationValue,
    paginationShouldBeComputed, setPaginationShouldBeComputed,
}) => {
    
    //const { bookList, setBookList} = useGlobalState()
    const { mongoBookList, setMongoBookList} = useGlobalState();
    const { usingLocal } = useGlobalState();
    
    return (
        <>
        <div className="testPageStyle">
            
            <IntroBanner/>
            <ConnectionStatus />
            <Insignia resource="Kaladin.png"/>
            {usingLocal === false? <p>WE ARE USING DATA FROM DATABASE</p> : <></>}
            {/* {mongoBookList.map( (book: any) => 
                <p>{book._id.toString()}</p>
            )} */}
            <AddButton link="/details/"/>
            <UtilitiesComponent 
            selectedPlanets={selectedPlanets} setSelectedPlanets={setSelectedPlanets}
            selectedSystems={selectedSystems} setSelectedSystems={setSelectedSystems}
            selectedShards={selectedShards} setSelectedShards={setSelectedShards}
            selectedDates={selectedDates} setSelectedDates={setSelectedDates}
            setFilterShouldBeComputed = {setFilterShouldBeComputed}

            sortCriteria = {sortCriteria} setSortCriteria = {setSortCriteria}
            sortDirection = {sortDirection} setSortDirection = {setSortDirection}
            setSortShouldBeComputed = {setSortShouldBeComputed}

            paginationValue={paginationValue} setPaginationValue={setPaginationValue}
            paginationShouldBeComputed = {paginationShouldBeComputed} setPaginationShouldBeComputed = {setPaginationShouldBeComputed}
            />
            <BookGrid 
            searchText = {searchText} 
            searchShouldBeComputed = {searchShouldBeComputed}
            bookList = {mongoBookList}
            setBookList = {setMongoBookList}
            filterShouldBeComputed = {filterShouldBeComputed}
            sortShouldBeComputed = {sortShouldBeComputed}
            paginationShouldBeComputed = {paginationShouldBeComputed}
            />
            
            <Insignia resource="Kaladin.png"/>
            <FooterBanner />
        </div>
        </>
    )
}
