import axios from "axios";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { FilterData, SortData } from "./server/app/api/routes/mongoBooks";

// Define types for your global state
interface GlobalState {
    clientIsConnectedToInternet: boolean;
    setClientIsConnectedToInternet: React.Dispatch<React.SetStateAction<boolean>>;
    serverIsRunning: boolean;
    setServerIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    usingLocal: boolean;
    setUsingLocal: React.Dispatch<React.SetStateAction<boolean>>;
    bookList: any;
    setBookList: React.Dispatch<React.SetStateAction<any>>;
    mongoBookList: any;
    setMongoBookList: React.Dispatch<React.SetStateAction<any>>;
    chapterList: any;
    setChapterList: React.Dispatch<React.SetStateAction<any>>;

    planetData: string[];
    setPlanetData: React.Dispatch<React.SetStateAction<string[]>>;
    systemData: string[];
    setSystemData: React.Dispatch<React.SetStateAction<string[]>>;
    shardData: string[];
    setShardData: React.Dispatch<React.SetStateAction<string[]>>;
    dateData: number[];
    setDateData: React.Dispatch<React.SetStateAction<number[]>>;

    currentFilterPlanetData: string[];
    setCurrentFilterPlanetData: React.Dispatch<React.SetStateAction<string[]>>;
    currentFilterSystemData: string[];
    setCurrentFilterSystemData: React.Dispatch<React.SetStateAction<string[]>>;
    currentFilterShardData: string[];
    setCurrentFilterShardData: React.Dispatch<React.SetStateAction<string[]>>;
    currentFilterDateData: number[];
    setCurrentFilterDateData: React.Dispatch<React.SetStateAction<number[]>>;

    currentSortCriteria: string;
    setCurrentSortCriteria: React.Dispatch<React.SetStateAction<string>>;
    currentSortDirection: number;
    setCurrentSortDirection: React.Dispatch<React.SetStateAction<number>>;

    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentElementsPerPage: number;
    setCurrentElementsPerPage: React.Dispatch<React.SetStateAction<number>>;

    refreshBookList: () => void;
    refreshFilterData: () => void;
    refreshCurrentFilterData: () => void;
    refreshCurrentSortData: () => void;
    refreshCurrentPage: () => void;
    setCurrentPageToBeginning: () => any;
    updateCurrentPage: (newCurrentPage: number) => void;
    refreshCurrentElementsPerPage: () => void;
    updateCurrentElementsPerPage: (newElementsPerPage: number) => any;
    
}

// Create a context for your global state
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component to wrap your entire app
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [clientIsConnectedToInternet, setClientIsConnectedToInternet] = useState(true);
    const [serverIsRunning, setServerIsRunning] = useState(true);
    const [usingLocal, setUsingLocal] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [mongoBookList, setMongoBookList] = useState([]);
    const [chapterList, setChapterList] = useState([]);
    
    const [planetData, setPlanetData] = useState<string[]>([]);
    const [systemData, setSystemData] = useState<string[]>([]);
    const [shardData, setShardData] = useState<string[]>([]);
    const [dateData, setDateData] = useState<number[]>([]);

    const [currentFilterPlanetData, setCurrentFilterPlanetData] = useState<string[]>([]);
    const [currentFilterSystemData, setCurrentFilterSystemData] = useState<string[]>([]);
    const [currentFilterShardData, setCurrentFilterShardData] = useState<string[]>([]);
    const [currentFilterDateData, setCurrentFilterDateData] = useState<number[]>([]);

    const [currentSortCriteria, setCurrentSortCriteria] = useState<string>("");
    const [currentSortDirection, setCurrentSortDirection] =  useState<number>(0);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentElementsPerPage, setCurrentElementsPerPage] = useState<number>(0);
    
    const refreshBookList = () =>{
      axios.get("http://localhost:4000/mongoBooks").then( response => {
        setMongoBookList(response.data.books);
        }).catch (error => {
        console.error('Error fetching backend data:', error);
        });
    }

    const refreshFilterData = () => {
      axios.get<{ filterData: FilterData }>("http://localhost:4000/mongoBooks/filter/data")
        .then(filterResponse => {
          console.log("FETCHING GFILTER DATA CURVELOR")
            const _filterData = filterResponse.data.filterData;
            setPlanetData(_filterData.planets);
            setSystemData(_filterData.systems);
            setShardData(_filterData.shards);
            setDateData(_filterData.dates);
        })
        .catch(error => {
            console.error('Error fetching filter data:', error);
        });
  };

  const refreshCurrentFilterData = () => {
    axios.get<{ currentFilterData: FilterData }>("http://localhost:4000/mongoBooks/filter/current/data").then(
      currentFilterResponse => {
        const _currentFilterData = currentFilterResponse.data.currentFilterData;
                     
        setCurrentFilterPlanetData(_currentFilterData.planets);
        setCurrentFilterSystemData(_currentFilterData.systems);
        setCurrentFilterShardData(_currentFilterData.shards);
        setCurrentFilterDateData(_currentFilterData.dates);
      })
  }

  const refreshCurrentSortData = () => {
    axios.get<{ sortData: SortData }>("http://localhost:4000/mongoBooks/sort/current/data").then(
      currentSortResponse => {
        setCurrentSortCriteria(currentSortResponse.data.sortData.criteria);
        setCurrentSortDirection(currentSortResponse.data.sortData.direction);
      })
  }

  const refreshCurrentPage = () => {
    axios.get<{currentPage: number}>("http://localhost:4000/mongoBooks/pagination/currentPage").then(
      currentPaginationResponse => {
        setCurrentPage(currentPaginationResponse.data.currentPage)
      }
    )
  }

  const setCurrentPageToBeginning = () => {
    axios.patch("http://localhost:4000/mongoBooks/pagination/currentPage", {
      currentPage: 1
    }).then(
      patchResult => {
        return patchResult.data.result;
      })
  }

  const updateCurrentPage = (newCurrentPage: number) => {
    axios.patch("http://localhost:4000/mongoBooks/pagination/currentPage", {
      currentPage: newCurrentPage
    }).then(
      patchResult => {
        return patchResult.data.result;
      })
  }

  const refreshCurrentElementsPerPage = () => {
    axios.get<{elementsPerPage: number}>("http://localhost:4000/mongoBooks/pagination/elementsPerPage").then(
      currentPaginationResponse => {
        setCurrentElementsPerPage(currentPaginationResponse.data.elementsPerPage)
      }
    )
  }

  const updateCurrentElementsPerPage = (newElementsPerPage: number) => {
    axios.patch("http://localhost:4000/mongoBooks/pagination/elementsPerPage", {
      elementsPerPage: newElementsPerPage
    }).then(
      patchResult => {
        return patchResult.data.result;
      })
  }

  

 

    useEffect(() => {
        axios.get("http://localhost:4000/books/search/NONE").then( response => {
            setBookList(response.data.books);
            }).catch (error => {
            console.error('Error fetching backend data:', error);
            });

        axios.get("http://localhost:4000/chapters").then( response => {
            setChapterList(response.data.chapters);
            }).catch (error => {
            console.error('Error fetching backend data:', error);
            }); 

            
        setCurrentPageToBeginning();
        refreshBookList();
        refreshFilterData();
        refreshCurrentFilterData();
        refreshCurrentSortData();
        refreshCurrentPage();
        refreshCurrentElementsPerPage();
        }, []);

  const state: GlobalState = {
    clientIsConnectedToInternet,
    setClientIsConnectedToInternet,
    serverIsRunning,
    setServerIsRunning,
    usingLocal,
    setUsingLocal,

    bookList,
    setBookList,
    mongoBookList,
    setMongoBookList,
    refreshBookList,

    chapterList,
    setChapterList,

    planetData,
    setPlanetData,
    systemData,
    setSystemData,
    shardData,
    setShardData,
    dateData,
    setDateData,
    refreshFilterData,

    currentFilterPlanetData,
    setCurrentFilterPlanetData,
    currentFilterSystemData,
    setCurrentFilterSystemData,
    currentFilterShardData,
    setCurrentFilterShardData,
    currentFilterDateData,
    setCurrentFilterDateData,
    refreshCurrentFilterData,

    currentSortCriteria,
    setCurrentSortCriteria,
    currentSortDirection,
    setCurrentSortDirection,
    refreshCurrentSortData,

    currentPage,
    setCurrentPage,
    refreshCurrentPage,
    setCurrentPageToBeginning,
    updateCurrentPage,

    currentElementsPerPage,
    setCurrentElementsPerPage,
    refreshCurrentElementsPerPage,
    updateCurrentElementsPerPage
  };

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to easily access the global state
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};