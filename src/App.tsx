import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme } from './client/ui/components/genericComponents/theme';
import { BookPage } from './client/ui/pages/bookPage/bookPage';
import { HomePage } from './client/ui/pages/homePage/homePage';
import { MainPage } from './client/ui/pages/mainPage/mainPage';
import { NoPage } from './client/ui/pages/noPage/noPage';
import { ChapterPage } from './client/ui/pages/chapterPage/chapterPage';
import { ChapterDetailPage } from './client/ui/pages/chapterPage/chapterDetailPage';
import { ChaptersOfBookPage } from './client/ui/pages/chapterPage/chapterPerBookPage';
import { GlobalStateProvider} from './globalVariables';


export const backendPath = "http://localhost:4000/"

function App() {

  
  const [searchText, setSearchText] = useState("")
  const [searchShouldBeComputed, setSearchShouldBeComputed] = useState("")
  const [filterShouldBeComputed, setFilterShouldBeComputed] = useState(false)

  const [sortShouldBeComputed, setSortShouldBeComputed] = useState(false);
  
  const [paginationValue, setPaginationValue] = useState(-1)
  const [paginationShouldBeComputed, setPaginationShouldBeComputed] = useState(false)

  return(
    <>
    <BrowserRouter>
    <GlobalStateProvider>
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

        filterShouldBeComputed = {filterShouldBeComputed} 
        setFilterShouldBeComputed = {setFilterShouldBeComputed}

        sortShouldBeComputed = {sortShouldBeComputed} 
        setSortShouldBeComputed = {setSortShouldBeComputed}
        
        paginationValue={paginationValue} setPaginationValue={setPaginationValue}
        paginationShouldBeComputed = {paginationShouldBeComputed} setPaginationShouldBeComputed = {setPaginationShouldBeComputed}
        />} />
        <Route path="/details/*" element={<BookPage />}/>
        <Route path="/chapters" element={<ChapterPage />}/>
        <Route path="/chapters/*" element={<ChapterDetailPage />}/>
        <Route path='/chapters/book/*' element = {<ChaptersOfBookPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      </Theme>
      </GlobalStateProvider>
    </BrowserRouter>
    </>
  )
}

export default App

      
      