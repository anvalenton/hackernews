import React, { useEffect, useState } from "react";
import axios from 'axios';
import Stories from "./Stories"
import { useParams, NavLink } from "react-router-dom";



const Search = () => {


    const initialGETURL = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

    const {query} = useParams();
    const [searchValue, setSearchValue] = useState(query);
    const [searchHistory, setSearchHistory] = useState([]);
    const [stories, setStories] = useState([]);
    console.log('search history is', searchHistory);
    let debounceHandler = null;

    function handleChange(evt) {

        setSearchValue(evt.target.value)

    }

    function saveToStorage(searchTerm) {

        console.log('inside savestorage func', searchTerm)
        const storedHistory = window.localStorage.getItem('searches');
        console.log('got history', storedHistory);
        if (storedHistory){
            const storedHistoryArr = storedHistory.split(',');
            const set = new Set(storedHistoryArr)
            console.log('storedHistoryArr is', storedHistoryArr)
        
            console.log('set is', set);
            localStorage.setItem('searches', [...new Set([...searchHistory,...storedHistoryArr, searchTerm])]);
            console.log('window storage', window.localStorage.searches);
        }
        //NEED TO SAVE LAST TERM IN STORAGE
        //MAYBE ABOVE IS RUNNING BEFORE SEARCH HISTORY UPDATES?
        else {


            localStorage.setItem('searches',[...new Set([...searchHistory, searchTerm])] )
        }

    }

    async function getStories(searchTerm) {
       
        if (searchTerm) {
            console.log('theres a search term');
            try {

                const searchRes = await axios.get(`http://hn.algolia.com/api/v1/search?query=${searchTerm}&tags=story`)
                setStories(searchRes.data.hits);

            }
            catch (e) {
                throw new Error('api call did not work');
            }

        }

        else {
            try {
                const response = await axios.get(initialGETURL);
                setStories(response.data.hits);
    
            }
            
            catch (e) {
                throw new Error('api call did not work');
            }


        }
   

      
    }


    //initial unsearched news. with debouncing
    useEffect(() => {
        
       
        let lastSearched = searchHistory[searchHistory.length-1];
        console.log('last searched is', lastSearched)
        console.log('searchHistory', searchHistory);

        if (searchValue && searchValue !== lastSearched ) {
            console.log('search value is', searchValue);
            
            clearTimeout(debounceHandler);
             
            debounceHandler = setTimeout(() => {
                getStories(searchValue);
                saveToStorage(searchValue);
                setSearchHistory((prevState) => ([...new Set([...prevState, searchValue])]));
             
            }, 400)
        
            return () => {
                clearTimeout(debounceHandler);
            }
        }
        console.log('windowstoreafter useeffect', window.localStorage.getItem('searches'))

    }, [searchValue])

 
    return (

        <>
        <nav>
            <NavLink to='/history'>History</NavLink>
        </nav>
        <div className='search-container'>
            <input className='search-input' placeholder='What are you looking for?' value={searchValue} onChange={handleChange}></input>
            
        </div>

        <div className='stories-container'>
           <Stories storyArr={stories}></Stories>
        </div>


        </>

    )
}





export default Search;