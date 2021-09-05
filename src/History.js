import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import {NavLink} from 'react-router-dom';



const History = () => {

    const storedSearchQueries = window.localStorage.getItem('searches');
    console.log('storedsearchqueries', storedSearchQueries)
    let searchArr = storedSearchQueries? storedSearchQueries.split(',') : null;
    console.log('search arr is', searchArr)
    // console.log('search array', searchArr);

    if (searchArr) {
        return (
            <> 
               <NavLink to='/'>Home</NavLink>
               <div className='searchhistory-container'>
                    <ul>
                    {searchArr.map((search) => (
                    
                        <li key={uuidv4()}>
                        <div className='pastsearch-div'>
                            <NavLink to={`/search/${search}`}>{search}</NavLink>
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </>
    
        )


    }

    else {
       
        return (

            <div>
                <NavLink to='/'>Home</NavLink>
                No history
            </div>
        )
    }
    
 
    
    
}

export default History;