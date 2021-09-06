import React from "react";
import {v4 as uuidv4} from 'uuid';
import {NavLink} from 'react-router-dom';



const History = () => {

    const storedSearchQueries = window.localStorage.getItem('searches');
    const searchArr = storedSearchQueries? storedSearchQueries.split(',') : null;

    if (searchArr) {
        return (
            <> 
              
               <div className='searchhistory-container'>
                    <ul>
                    {searchArr.map((search) => (
                    
                        <li key={uuidv4()}>
                        <div className='pastsearch-div'>
                            <NavLink to={`search/${search}`} activeClassName={'active'}>{search}</NavLink>
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
               
                <div className='nohistorytext-container'>No History</div>
            </div>
        )
    }
    
 
    
    
}

export default History;