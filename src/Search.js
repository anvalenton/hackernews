import React, { useEffect, useState } from "react";
import axios from 'axios';
import Stories from "./Stories"



const Search = () => {


    const initialGETURL = 'http://hn.algolia.com/api/v1/search_by_date?query=...';

    const [searchValue, setSearchValue] = useState('test')
    const [searchHistory, setSearchHistory] = useState();
    const [stories, setStories] = useState();


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
       

        return await axios.get(initialGETURL);
      
    }


    //initial unsearched news
    useEffect(() => {

        axios.get(initialGETURL).then((response)=>{
            setStories(response.data);
            console.log(response.data);
        })
       
    }, [])



    return (

        <>

        <div className='search-container'>
            <input className='search-input' placeholder='What are you looking for?' value={searchValue} onChange={handleChange}></input>
            <button className='search-button' onClick={handleClick}>Search</button>

            <Stories></Stories>
            
        </div>


        </>

    )
}





export default Search;