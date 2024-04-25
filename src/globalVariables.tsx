import axios from "axios";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

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

    useEffect(() => {
        axios.get("http://localhost:4000/books/search/NONE").then( response => {
            setBookList(response.data.books);
            }).catch (error => {
            console.error('Error fetching backend data:', error);
            });

        axios.get("http://localhost:4000/mongoBooks").then( response => {
            setMongoBookList(response.data.books);
            }).catch (error => {
            console.error('Error fetching backend data:', error);
            });

        axios.get("http://localhost:4000/chapters").then( response => {
            setChapterList(response.data.chapters);
            }).catch (error => {
            console.error('Error fetching backend data:', error);
            }); 
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
    chapterList,
    setChapterList,
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