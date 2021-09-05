import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';

const Stories = ({storyArr}) => {


return (

    <>
        <ul>
        {storyArr.map((story) => {
            if (story.url) {

            return  <li key={uuidv4()}>
                    <div className='title-div'>
                    <a href={story.url}>{story.title}</a><span className='author'> by {story.author}</span>
                    </div>
                    <div className='linkinfo-div'>
                    <span>Posted: {story.created_at.slice(0,10)}</span>
                    </div>

                    </li>

            }
           
                

            })}


        </ul>
       
    </>


)
}

export default Stories;