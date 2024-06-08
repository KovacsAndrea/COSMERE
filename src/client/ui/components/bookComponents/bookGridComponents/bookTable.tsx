import { useEffect, useState } from "react";
import BookCard from "./bookCard.tsx";
import './bookTable.css'
import React from "react";
import axios from "axios";
import { PaginationButton } from "../../genericComponents/paginationButton/paginationButton.tsx";
import { useGlobalState } from "../../../../../globalVariables.tsx";
import LoadingComponent from "../../loadingComponent/loadingComponent.tsx";

const BookTable: React.FC<{ 
    searchText: string, 
    searchShouldBeComputed: any
    bookList: any, 
    setBookList: any
    filterShouldBeComputed: any,
    setFilterShouldBeComputed: any
    sortShouldBeComputed: any
    setSortShouldBeComputed: any
    paginationShouldBeComputed: any
    setPaginationShouldBeComputed: any
    backendCurrentPage: any
    setBackendCurrentPage: any
    setMaxPageNr: any
}> = 
({ searchText, 
    searchShouldBeComputed, 
    bookList, 
    setBookList, 
    filterShouldBeComputed,
    setFilterShouldBeComputed,
    sortShouldBeComputed, 
    setSortShouldBeComputed,
    paginationShouldBeComputed,
    setPaginationShouldBeComputed, 
    backendCurrentPage, 
    setBackendCurrentPage, 
    setMaxPageNr
}) => {
    const token = sessionStorage.getItem('token');
    const [deleteBook, setDeleteBook] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const { usingLocal, cosmerePath } = useGlobalState();
    console.log(searchText)
    const { 
        refreshFilterData, 
        refreshBookList, 
        updateCurrentPage,
        currentPage,
     } = useGlobalState();

    useEffect(() => {
        async function useLocalData() {
            let currentSearchText = searchShouldBeComputed
        if( currentSearchText === "" ) {
            currentSearchText = "NONE"
        }
  
        if(filterShouldBeComputed ){
            console.log("FAKEM Filter")
            updatePaginationButton();
            axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
                setBookList(response.data.books);
                }).catch (error => {
                console.error('Error fetching backend data:', error);
                })
        }

        if(sortShouldBeComputed){
            console.log("FAKEM SORT")
            axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
                setBookList(response.data.books);
                console.log(response.data.books);
                }).catch (error => {
                console.error('Error fetching backend data:', error);
                })
        }

        async function updatePaginationButton() {
            axios.get("http://localhost:4000/pagination/current").then( response => {
                setBackendCurrentPage(response.data.currentPage)
            })
            axios.get("http://localhost:4000/pagination/max").then( response => {
                setMaxPageNr(response.data.maxPage)
            })
            axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
                setBookList(response.data.books);
            }).catch (error => {
            console.error('Error fetching backend data:', error);
            })
        }
        
        if(searchShouldBeComputed){
            console.log("FAKEM SEARCH")
            console.log("Search text -> " + currentSearchText)
            updatePaginationButton()
            axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
                setBookList(response.data.books);
                
                console.log("The result from the search " + response.data.books)
                }).catch (error => {
                console.error('Error fetching backend data:', error);
                })
        }

        if(paginationShouldBeComputed ){
            console.log("FAKEM PAGINARE")
            console.log("PAginare: search text -> " + currentSearchText)

            updatePaginationButton()
            axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
                setBookList(response.data.books);
                
                console.log("The result from the search " + response.data.books)
                }).catch (error => {
                console.error('Error fetching backend data:', error);
                })
        }

        if(deleteBook !== ""){
            console.log(deleteBook)
            axios.delete('http://localhost:4000/books/' + deleteBook).then(() =>
            axios.get("http://localhost:4000/books/search/" + currentSearchText).then(response => {
                    setBookList(response.data.books)
                }).catch (error => {console.error("Error fetching books after delere: ", error);
            })).catch(error => {console.error("Error deleting book:", error);})
        }

        if(currentSearchText != ""){
            axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
                setBookList(response.data.books);
                }).catch (error => {
                console.error('Error computing search result', error);
            })
        }
        console.log(currentSearchText)
        console.log(backendCurrentPage)
        }


        async function useCloudData() {
            setIsLoading(true)
            if(deleteBook.length != 0){
                try{
                    await axios.delete(cosmerePath + '/mongoBooks/' + deleteBook, {headers: {Authorization: `${token}`}})
                }catch(error){
                        alert(error.response.data.error)
                }
                await refreshBookList();
                await refreshFilterData();
                await setDeleteBook("")
            }

            if(filterShouldBeComputed){
                console.log("BOOK TABLE SAYS WE SHOULD COMPUTE FILTER")
                updateCurrentPage(1)
                await refreshBookList();
                await setFilterShouldBeComputed(false)
            }

            if(sortShouldBeComputed){
                console.log("BOOK TABLE SAYS SORT SHOULD BE COMPUTED")
                updateCurrentPage(1)
                await refreshBookList();
                await setSortShouldBeComputed(false)
            }

            if(paginationShouldBeComputed){
                console.log("BOOK TABLE SAYS PAGINATION SHOULD BE COMPUTED")           
                updateCurrentPage(1)
                refreshBookList()
                setPaginationShouldBeComputed(false)
            }
            setIsLoading(false)
        }

        async function fetchData() {
            if (usingLocal) {
                useLocalData();
            } else {
                await useCloudData(); // Wait for the async operation to complete
            }
        }
    
        fetchData();
    }, [bookList, 
        deleteBook, 
        backendCurrentPage, 
        searchShouldBeComputed, 
        filterShouldBeComputed, 
        paginationShouldBeComputed, 
        sortShouldBeComputed,
        currentPage, 
    ])

    if (isLoading) {
        return <LoadingComponent />;
    }
    return (
        <>
        {bookList && bookList.length === 0 ? 
            <div className="outOfInvestiture">
            <p className = "outOfInvestitureParagraph">Out of Investiture</p>
            </div>
            : <>
            
            {bookList ? bookList.map( (book: any) =>
                    <BookCard 
                    key = {book._id}
                    bookId = {book._id}
                    bookTitle = {book._title}
                    bookDescription = {book._description}
                    bookChapers = {book._chapteeeeers}
                    bookChaptersFormat = {book._chaptersFormat}
                    bookPlanet = {book._planet}
                    bookSystem = {book._system}
                    bookShard = {book._shard}
                    bookDate = {book._startDate}
                    setDeleteBook={setDeleteBook} />
            ) : <></>}
            </>}
        
        
        </>
        
    )
}

export const BookGrid: React.FC<{ searchText: string, 
    searchShouldBeComputed: any,
    bookList: any, setBookList: any,
    filterShouldBeComputed: any
    setFilterShouldBeComputed: any
    sortShouldBeComputed: any
    setSortShouldBeComputed: any
    paginationShouldBeComputed: any
    setPaginationShouldBeComputed: any
}> = 
({searchText, 
    searchShouldBeComputed,
    bookList, setBookList, 
    filterShouldBeComputed,
    setFilterShouldBeComputed,
    sortShouldBeComputed,
    setSortShouldBeComputed,
    paginationShouldBeComputed,
    setPaginationShouldBeComputed
}) => {
    const [backendCurrentPage, setBackendCurrentPage] = useState(1);
    const [maxPageNr, setMaxPageNr] = useState(1);
    console.log(maxPageNr)
    const { usingLocal } = useGlobalState();
    useEffect(() => {
        async function updatePaginationButton() {
            let currentSearchText = searchShouldBeComputed
            if( currentSearchText === "" ) {
                currentSearchText = "NONE"
            }
            async function useLocalData() {
                axios.get("http://localhost:4000/pagination/current").then( response => {
                    setBackendCurrentPage(response.data.currentPage)
                    })
                    axios.get("http://localhost:4000/pagination/max").then( response => {
                        setMaxPageNr(response.data.maxPage)
                    })
                    axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
                    setBookList(response.data.books);
                    }).catch (error => {
                    console.error('Error fetching backend data:', error);
                    })
                    
            }
            async function useCloudData() {
                console.log(" -----------USING CLOUD DATA -----------")
            }
           if(usingLocal){useLocalData()} else {useCloudData()}
        }
        updatePaginationButton();
    }, [])
    return (
        <div className = "center">
        
        <PaginationButton />
        <div className ="cardGrid">
            
            <BookTable 
                searchText= {searchText}
                searchShouldBeComputed = {searchShouldBeComputed}
                bookList = {bookList}
                setBookList = {setBookList} 
                filterShouldBeComputed = {filterShouldBeComputed}
                setFilterShouldBeComputed = {setFilterShouldBeComputed}
                sortShouldBeComputed = {sortShouldBeComputed}
                setSortShouldBeComputed = {setSortShouldBeComputed}
                paginationShouldBeComputed = {paginationShouldBeComputed}
                setPaginationShouldBeComputed = {setPaginationShouldBeComputed}
                backendCurrentPage={backendCurrentPage}
                setBackendCurrentPage = {setBackendCurrentPage}
                setMaxPageNr = {setMaxPageNr}
            >    
            </BookTable>
        </div>
        </div>
    )
}