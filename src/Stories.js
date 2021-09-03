import React from "react";


const Stories = ({storyArr}) => {


return (

    <>
        <ul>
        {storyArr.map((story) => {
            if (story.url) {

            return  <li key={story.title+story.author}>
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