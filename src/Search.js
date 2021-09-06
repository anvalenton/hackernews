import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Stories from "./Stories"
import { useParams} from "react-router-dom";



const Search = () => {


    const initialGETURL = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';

    const {query} = useParams();
    const [searchValue, setSearchValue] = useState(() => (query? query: ''));
    const [searchHistory, setSearchHistory] = useState([]);
    const [stories, setStories] = useState([]);
   
    let debounceHandler = useRef(null);


    async function getStories(searchTerm) {
       
        if (searchTerm) {
           
            try {
                const searchRes = await axios.get(`https://hn.algolia.com/api/v1/search?query=${searchTerm}&tags=story`)
                setStories(searchRes.data.hits);
            }
            catch (e) {
                throw new Error('API call did not work');
            }
        }
        //below api call shows latest stories
        else {
            try {
                const response = await axios.get(initialGETURL);
                setStories(response.data.hits);
            }
            catch (e) {
                throw new Error('API call did not work');
            }
        }
    }


    useEffect(() => {
    
        let lastSearched = searchHistory[searchHistory.length-1];
        if (searchValue && searchValue !== lastSearched ) {
          
            clearTimeout(debounceHandler.current);
            debounceHandler.current = setTimeout(() => {
                getStories(searchValue);
                setSearchHistory((prevState) => ([...new Set([searchValue, ...prevState])]));
             
            }, 400)
        
            return () => {
                clearTimeout(debounceHandler);
            }
        }
        
        else {
            getStories();
        }

    }, [searchValue, searchHistory])

    useEffect(() => {

        const storedHistory = window.localStorage.getItem('searches');
        if (storedHistory){
            const storedHistoryArr = storedHistory.split(',');
            localStorage.setItem('searches', [...new Set([...searchHistory,...storedHistoryArr])]);
        }
        else {
            localStorage.setItem('searches',[...new Set([...searchHistory])] )
        }

    }, [searchHistory])


    return (

        <>
     
        <div className='search-container'>
            <input className='search-input' placeholder=' Looking for?' value={searchValue} onChange={(evt) => (setSearchValue(evt.target.value))}></input>
            
        </div>

        <div className='stories-container'>
           <Stories storyArr={stories}></Stories>
        </div>
        </>

    )
}





export default Search;