import './navBar.css'
import { Link } from 'react-router-dom'
import { SearchBar } from './searchBar.tsx'
import React, { useEffect } from "react";
import { useGlobalState } from '../../../../../globalVariables.tsx';
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
    const { 
        user,
        refreshUser
     } = useGlobalState();

    useEffect(() => {
        refreshUser();
    }, [])
    return (
        <>
            <nav>
                <ul className='nav-bar-content'>
                    <div className = 'user-profile'>
                        <p> {user} </p> </div>
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