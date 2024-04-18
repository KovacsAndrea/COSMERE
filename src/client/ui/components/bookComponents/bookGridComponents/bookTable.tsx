import { useEffect, useState } from "react";
import BookCard from "./bookCard.tsx";
import './bookTable.css'
import React from "react";
import axios from "axios";
import { PaginationButton } from "../../genericComponents/paginationButton/paginationButton.tsx";

const BookTable: React.FC<{ searchText: string, 
    searchShouldBeComputed: any
    bookList: any, 
    setBookList: any
    filterShouldBeComputed: any
    sortShouldBeComputed: any
    paginationShouldBeComputed: any
    setStuffChanged: any
}> = 
({ searchText, searchShouldBeComputed, bookList, setBookList, filterShouldBeComputed,
    sortShouldBeComputed, paginationShouldBeComputed, setStuffChanged
}) => {
    let listItems = bookList;
    const [deleteBook, setDeleteBook] = useState("")
    useEffect(() => {
        
        let currentSearchText = searchShouldBeComputed
    
        // if(filterShouldBeComputed ){
        //     console.log("FAKEM Filter")
        //     setStuffChanged(true)
        //     axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
        //         setBookList(response.data.books);
        //         }).catch (error => {
        //         console.error('Error fetching backend data:', error);
        //         })
        // }

        // if(sortShouldBeComputed){
        //     console.log("FAKEM SORT")
        //     axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
        //         setBookList(response.data.books);
        //         }).catch (error => {
        //         console.error('Error fetching backend data:', error);
        //         })
        // }

        if(paginationShouldBeComputed || searchShouldBeComputed){
            console.log("FAKEM PAGINARE")
            console.log("PAginare: search text -> " + currentSearchText)
            setStuffChanged(true)
            axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
                setBookList(response.data.books);
                
                console.log("The result from the search " + response.data.books.toString())
                }).catch (error => {
                console.error('Error fetching backend data:', error);
                })
        }

        // if(deleteBook !== ""){
        //     console.log(deleteBook)
        //     axios.delete('http://localhost:4000/books/' + deleteBook).then(() =>
        //     axios.get("http://localhost:4000/books/search/" + currentSearchText).then(response => {
        //             setBookList(response.data.books)
        //         }).catch (error => {console.error("Error fetching books after delere: ", error);
        //     })).catch(error => {console.error("Error deleting book:", error);})
        // }

        // if(currentSearchText != ""){
        //     axios.get("http://localhost:4000/books/search/" + currentSearchText).then( response => {
        //         setBookList(response.data.books);
        //         }).catch (error => {
        //         console.error('Error computing search result', error);
        //     })
        // }
        console.log(currentSearchText)
    }, [deleteBook, searchShouldBeComputed, filterShouldBeComputed, paginationShouldBeComputed, sortShouldBeComputed])


    return (
        <>
        {bookList.length === 0 ? 
            <div className="outOfInvestiture">
            <p className = "outOfInvestitureParagraph">Out of Investiture</p>
            </div>
            : <>
            
            {listItems.map( (book: any) =>
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
            )}
            </>}
        
        
        </>
        
    )
}

export const BookGrid: React.FC<{ searchText: string, 
    searchShouldBeComputed: any,
    bookList: any, setBookList: any,
    filterShouldBeComputed: any
    sortShouldBeComputed: any
    paginationShouldBeComputed: any
}> = 
({searchText, 
    searchShouldBeComputed,
    bookList, setBookList, 
    filterShouldBeComputed,
    sortShouldBeComputed,
    paginationShouldBeComputed
}) => {
    
    const [stuffChanged, setStuffChanded] = useState(false)
    return (
        <div className = "center">
        
        <PaginationButton 
                setBookList = {setBookList}
                stuffChanged = {stuffChanged}
                setStuffChanged = {setStuffChanded}/>
        <div className ="cardGrid">
            
            <BookTable 
                searchText= {searchText}
                searchShouldBeComputed = {searchShouldBeComputed}
                bookList = {bookList}
                setBookList = {setBookList} 
                filterShouldBeComputed = {filterShouldBeComputed}
                sortShouldBeComputed = {sortShouldBeComputed}
                paginationShouldBeComputed = {paginationShouldBeComputed}
                setStuffChanged = {setStuffChanded}
            >    
            </BookTable>
        </div>
        </div>
    )
}