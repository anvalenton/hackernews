import React from "react";
import {NavLink, useLocation} from 'react-router-dom';

const Nav = () => {


    const {pathname} = useLocation();

    return (
        <nav className='nav'>
            <div className='navlink-container'>
            <NavLink className='navlink' isActive={() => (pathname.includes('/search') || pathname === '/' || pathname ==='/hackernews')} exact to='/search'>SEARCH</NavLink>
            </div>
            <div className='navlink-container'>
            <NavLink className='navlink' exact to='/history'>HISTORY</NavLink>
            </div>
            

        </nav>

    )
}

export default Nav;