import './navBar.css'
import { Link } from 'react-router-dom'
import { SearchBar } from './searchBar.tsx'
import React from "react";
export const NavBar: React.FC<{
    searchText: string, 
    setSearchText: any,
    searchShouldBeComputed: any,
    setSearchShouldBeComputed: any, 
}> = 
({searchText, 
    setSearchText,
    searchShouldBeComputed,
        setSearchShouldBeComputed,
}) =>{
    return (
        <>
            <nav>
                <ul>
                    <li className='logo'>
                        <Link to = "/main" className="cosmereLogo">THE COSMERE</Link>
                    </li>
                    <SearchBar 
                     searchText = {searchText} 
                     setSearchText = {setSearchText}
                     searchShouldBeComputed = {searchShouldBeComputed}
                    setSearchShouldBeComputed = {setSearchShouldBeComputed}
                    />
                </ul>
            </nav>
        </>
    )
}