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

    bookViewLength: number;
    setBookViewLength: React.Dispatch<React.SetStateAction<number>>

    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    refreshUser: () => any;

    refreshBookList: () => void;
    refreshFilterData: () => void;
    refreshCurrentFilterData: () => void;
    refreshCurrentSortData: () => void;
    refreshCurrentPage: () => void;
    updateCurrentPage: (newCurrentPage: number) => void;
    refreshCurrentElementsPerPage: () => void;
    updateCurrentElementsPerPage: (newElementsPerPage: number) => any;
    refreshBookViewLength: () => any;
    
}

// Create a context for your global state
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component to wrap your entire app
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const token = sessionStorage.getItem('token');
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
    
    const [bookViewLength, setBookViewLength] = useState(0);

    const [user, setUser] = useState("")


    const refreshBookList = () =>{
      axios.get("http://localhost:4000/mongoBooks", {headers: {Authorization: `${token}`}}).then( response => {
        setMongoBookList(response.data.books);
        }).catch (error => {
        console.error('Error fetching backend data:', error);
        });
    }

    const refreshFilterData = () => {
      axios.get<{ filterData: FilterData }>("http://localhost:4000/mongoBooks/filter/data", {headers: {Authorization: `${token}`}})
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
    axios.get<{ currentFilterData: FilterData }>("http://localhost:4000/mongoBooks/filter/current/data", {headers: {Authorization: `${token}`}}).then(
      currentFilterResponse => {
        const _currentFilterData = currentFilterResponse.data.currentFilterData;
                     
        setCurrentFilterPlanetData(_currentFilterData.planets);
        setCurrentFilterSystemData(_currentFilterData.systems);
        setCurrentFilterShardData(_currentFilterData.shards);
        setCurrentFilterDateData(_currentFilterData.dates);
      })
  }

  const refreshCurrentSortData = () => {
    axios.get<{ sortData: SortData }>("http://localhost:4000/mongoBooks/sort/current/data", {headers: {Authorization: `${token}`}}).then(
      currentSortResponse => {
        setCurrentSortCriteria(currentSortResponse.data.sortData.criteria);
        setCurrentSortDirection(currentSortResponse.data.sortData.direction);
      })
  }

  const refreshCurrentPage = () => {
    axios.get<{currentPage: number}>("http://localhost:4000/mongoBooks/pagination/currentPage", {headers: {Authorization: `${token}`}}).then(
      currentPaginationResponse => {
        //console.log("REFRESHING CURRENT PAGE TO: " + currentPaginationResponse.data.currentPage)
        setCurrentPage(currentPaginationResponse.data.currentPage)
      }
    )
  }

  const updateCurrentPage =  async (newCurrentPage: number) => {
    await axios.patch("http://localhost:4000/mongoBooks/pagination/currentPage", {
      currentPage: newCurrentPage
    }, {headers: {Authorization: `Bearer ${token}`}})
    const result = await axios.get<{currentPage: number}>("http://localhost:4000/mongoBooks/pagination/currentPage", {headers: {Authorization: `${token}`}})
    setCurrentPage(result.data.currentPage)
  }

  const refreshCurrentElementsPerPage = async () => {
    const result = await axios.get<{elementsPerPage: number}>("http://localhost:4000/mongoBooks/pagination/elementsPerPage", {headers: {Authorization: `${token}`}})
    setCurrentElementsPerPage(result.data.elementsPerPage)
  }

  const updateCurrentElementsPerPage = async (newElementsPerPage: number) => {
    await axios.patch("http://localhost:4000/mongoBooks/pagination/elementsPerPage", {
      elementsPerPage: newElementsPerPage
    }, {headers: {Authorization: `Bearer ${token}`}})
    const result = await axios.get<{elementsPerPage: number}>("http://localhost:4000/mongoBooks/pagination/elementsPerPage", {headers: {Authorization: `${token}`}})
    setCurrentElementsPerPage(result.data.elementsPerPage)
  }

  const refreshBookViewLength = async () => {
    const result = await axios.get<{length: number}>("http://localhost:4000/mongoBooks/view/length", {headers: {Authorization: `${token}`}})
    setBookViewLength(result.data.length)
  }

  const refreshUser = async () => {
    const token = sessionStorage.getItem('token')
    const user = await axios.get("http://localhost:4000/mongoUsers/auth", {
      params: {
        token: token
      }
    })
    setUser(user.data.decoded.email)
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

        
        refreshBookList();
        refreshFilterData();
        refreshCurrentFilterData();
        refreshCurrentSortData();
        refreshCurrentElementsPerPage();
        updateCurrentPage(1);
        refreshUser();
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
    updateCurrentPage,

    currentElementsPerPage,
    setCurrentElementsPerPage,
    refreshCurrentElementsPerPage,
    updateCurrentElementsPerPage,

    bookViewLength,
    setBookViewLength,
    refreshBookViewLength,

    user,
    setUser,
    refreshUser
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