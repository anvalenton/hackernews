import React, { useEffect, useState } from "react";
import axios from 'axios';
import Stories from "./Stories"



const Search = () => {


    const initialGETURL = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';



    const [searchValue, setSearchValue] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [stories, setStories] = useState([]);

   let debounceHandler = null;

 

    function handleChange(evt) {

        setSearchValue(evt.target.value)
    }

    function saveToStorage(searchTerm, searchResults) {



    }

    async function getInitStories() {
       
  
        try {
            const response = await axios.get(initialGETURL);
            setStories(response.data.hits);

        }
        
        catch (e) {
            throw new Error('api call did not work');
        }

      
    }
    //trying to stay faithful to no 
    async function getQueriedStories(searchTerm) {
       
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
    }

    //initial unsearched news
    useEffect(() => {
        
        clearTimeout(debounceHandler);
        debounceHandler = setTimeout(() => {
            getQueriedStories(searchValue);
            setSearchHistory((prevState) => (prevState.filter((term) => ([...prevState, searchValue]));
            console.log('search history is', searchHistory);
            
        }, 1000)
    
        return () => {
            clearTimeout(debounceHandler);
        }
     
    }, [searchValue])



    return (

        <>

        <div className='search-container'>
            <form>
                <label htmlFor='searchInput'></label>
                <input className='search-input' placeholder='What are you looking for?' value={searchValue} onChange={handleChange}></input>
              
            </form>
            
            
        </div>

        <div className='stories-container'>
           <Stories storyArr={stories}></Stories>
        </div>


        </>

    )
}





export default Search;