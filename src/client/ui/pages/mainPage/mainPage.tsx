import { BookGrid } from "../../components/bookComponents/bookGridComponents/bookTable.tsx"
import './mainPage.css'
import { AddButton } from "../../components/genericComponents/addButton/addButton.tsx";
import { FooterBanner } from "../../components/genericComponents/decor/footer/footerBanner.tsx";
import { IntroBanner } from "../../components/genericComponents/decor/header/introBanner.tsx";
import { Insignia } from "../../components/genericComponents/decor/insignia/insignia.tsx";

import { UtilitiesComponent } from "../../components/sortFilterComponents/sortFilterChartComponent.tsx";

import { ConnectionStatus } from "../../components/genericComponents/connectionStatus/connectionStatus.tsx";
import { useGlobalState } from "../../../../globalVariables.tsx";
import { useEffect } from "react";


// Usage

export const MainPage: React.FC<{ 
    searchText: any,  
    searchShouldBeComputed: any,

    filterShouldBeComputed: any, 
    setFilterShouldBeComputed: any,

    sortShouldBeComputed: any, 
    setSortShouldBeComputed: any
    
    paginationShouldBeComputed: any, setPaginationShouldBeComputed: any,
}> = 
    ({searchText, searchShouldBeComputed,
    filterShouldBeComputed, setFilterShouldBeComputed,
    sortShouldBeComputed, setSortShouldBeComputed,
    paginationShouldBeComputed, setPaginationShouldBeComputed,
}) => {
    
    //const { bookList, setBookList} = useGlobalState()
    const { mongoBookList, setMongoBookList} = useGlobalState();
    useEffect(() => {console.log("MAIN PAGE               ->>>>>>>>>>>>>>>>>> IS RENDERING")}, [])
    return (
        <>
        <div className="testPageStyle">
            
            <IntroBanner/>
            <ConnectionStatus />
            <Insignia resource="Kaladin.png"/>
            {/* {usingLocal === false? <p>WE ARE USING DATA FROM DATABASE</p> : <></>} */}
            {/* {mongoBookList.map( (book: any) => 
                <p>{book._id.toString()}</p>
            )} */}
            <AddButton link="/details/"/>
            <UtilitiesComponent 
            setFilterShouldBeComputed = {setFilterShouldBeComputed}

            setSortShouldBeComputed = {setSortShouldBeComputed}

            setPaginationShouldBeComputed = {setPaginationShouldBeComputed}
            />
            <BookGrid 
            searchText = {searchText} 
            searchShouldBeComputed = {searchShouldBeComputed}
            
            bookList = {mongoBookList}
            setBookList = {setMongoBookList}

            filterShouldBeComputed = {filterShouldBeComputed}
            setFilterShouldBeComputed = {setFilterShouldBeComputed}
            
            sortShouldBeComputed = {sortShouldBeComputed}
            setSortShouldBeComputed = {setSortShouldBeComputed}
            
            paginationShouldBeComputed = {paginationShouldBeComputed}
            setPaginationShouldBeComputed ={setPaginationShouldBeComputed}
            />
            
            <Insignia resource="Kaladin.png"/>
            <FooterBanner />
        </div>
        </>
    )
}
