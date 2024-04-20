import { ReactNode} from "react";
import { NavBar } from "./themeComponents/navBar.tsx"
import { useLocation } from "react-router-dom";
import React from "react";

export const Theme: React.FC<{
    searchText: any, 
    setSearchText:any,
    searchShouldBeComputed: any,
    setSearchShouldBeComputed: any, 
    children: ReactNode}> = ({
        searchText, 
        setSearchText, 
        searchShouldBeComputed,
        setSearchShouldBeComputed,
        children}) => {
    const location = useLocation();
    const navShouldBeDisplayed = (
            location.pathname == '/main' ||
            location.pathname.startsWith('/details/') || 
            location.pathname.startsWith('/chapters'))
    return (
        <>
        {navShouldBeDisplayed === true ? 
        <> 
            <NavBar 
            searchText= {searchText}
            setSearchText={setSearchText}
            searchShouldBeComputed = {searchShouldBeComputed}
            setSearchShouldBeComputed = {setSearchShouldBeComputed}
            ></NavBar>
            <p>{location.pathname}</p>
            <main>{children}</main>
        </>
        : 

        <>
        <main>{children}</main>
        </>
        }
        </>
    );
};