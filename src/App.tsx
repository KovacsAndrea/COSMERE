import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme } from './client/ui/components/genericComponents/theme';
import { BookPage } from './client/ui/pages/bookPage/bookPage';
import { HomePage } from './client/ui/pages/homePage/homePage';
import { MainPage } from './client/ui/pages/mainPage/mainPage';
import { NoPage } from './client/ui/pages/noPage/noPage';
import axios from "axios"
import { ChapterPage } from './client/ui/pages/chapterPage/chapterPage';
import { ChapterDetailPage } from './client/ui/pages/chapterPage/chapterDetailPage';
import { ChaptersOfBookPage } from './client/ui/pages/chapterPage/chapterPerBookPage';


export const backendPath = "http://localhost:4000/"

function App() {

  
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/books/search/NONE").then( response => {
      setBookList(response.data.books);
    }).catch (error => {
      console.error('Error fetching backend data:', error);
    })
}, []);

  const [chapterList, setChapterList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/chapters").then( response => {
      setChapterList(response.data.chapters);
    }).catch (error => {
      console.error('Error fetching backend data:', error);
    })
}, []);

  const [searchText, setSearchText] = useState("")
  const [searchShouldBeComputed, setSearchShouldBeComputed] = useState("")
  const [selectedPlanets, setSelectedPlanets] = useState([]);
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [selectedShards, setSelectedShards] = useState([]);
  const [selectedDates, setSelectedDates] = useState([])
  const [filterShouldBeComputed, setFilterShouldBeComputed] = useState(false)

  const [sortCriteria, setSortCriteria] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [sortShouldBeComputed, setSortShouldBeComputed] = useState(false);
  
  const [paginationValue, setPaginationValue] = useState(-1)
  const [paginationShouldBeComputed, setPaginationShouldBeComputed] = useState(false)

  return(
    <>
    <BrowserRouter>
      <Theme searchText={searchText} 
      setSearchText={setSearchText}
      searchShouldBeComputed = {searchShouldBeComputed}
      setSearchShouldBeComputed = {setSearchShouldBeComputed}
      >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage 
        searchText={searchText} 
        searchShouldBeComputed = {searchShouldBeComputed}
        bookList = {bookList} setBookList = {setBookList} 
        selectedPlanets = {selectedPlanets} setSelectedPlanets = {setSelectedPlanets}
        selectedSystems={selectedSystems} setSelectedSystems={setSelectedSystems}
        selectedShards={selectedShards} setSelectedShards={setSelectedShards}
        selectedDates={selectedDates} setSelectedDates={setSelectedDates}
        filterShouldBeComputed = {filterShouldBeComputed} setFilterShouldBeComputed = {setFilterShouldBeComputed}
        sortCriteria = {sortCriteria} setSortCriteria = {setSortCriteria}
        sortDirection = {sortDirection} setSortDirection = {setSortDirection}
        sortShouldBeComputed = {sortShouldBeComputed} setSortShouldBeComputed = {setSortShouldBeComputed}
        paginationValue={paginationValue} setPaginationValue={setPaginationValue}
        paginationShouldBeComputed = {paginationShouldBeComputed} setPaginationShouldBeComputed = {setPaginationShouldBeComputed}
        />} />
        <Route path="/details/*" element={<BookPage />}/>
        <Route path="/chapters" element={<ChapterPage chapterList = {chapterList} setChapterList = {setChapterList} />}/>
        <Route path="/chapters/*" element={<ChapterDetailPage />}/>
        <Route path='/chapters/book/*' element = {<ChaptersOfBookPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      </Theme>
    </BrowserRouter>
    </>
  )
}

export default App

      
      