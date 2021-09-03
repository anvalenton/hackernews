import React, { useEffect, useState } from "react";
import axios from 'axios';
import Stories from "./Stories"



const Search = () => {


    const initialGETURL = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

    const [searchValue, setSearchValue] = useState('test')
    const [searchHistory, setSearchHistory] = useState();
    const [stories, setStories] = useState([]);


    function handleClick() {

        //do api call
        //store search in local storage

    }

    function handleChange(evt) {

        setSearchValue(evt.target.value)

    }

    function saveToStorage(searchTerm, searchResults) {



    }

    async function getStories() {
       
        try {
            const response = await axios.get(initialGETURL);
            console.log('response hits', response.data.hits);
            setStories(response.data.hits);
            console.log('set stories is', stories);
            
        }
       
        catch (e) {
            throw new Error('api call did not work');
        }
      
    }

    //initial unsearched news
    useEffect(() => {

        getStories();
       
    }, [])

    

    return (

        <>

        <div className='search-container'>
            <input className='search-input' placeholder='What are you looking for?' value={searchValue} onChange={handleChange}></input>
            <button className='search-button' onClick={handleClick}>Search</button>
            
            
        </div>

        <div className='stories-container'>
           <Stories storyArr={stories}></Stories>
        </div>


        </>

    )
}





export default Search;