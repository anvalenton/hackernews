import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';

const Nav = () => {





    return (
        <nav>
            <NavLink exact to='/'>Search</NavLink>
            <NavLink exact to='/history'>History</NavLink>

        </nav>

    )
}

export default Nav;