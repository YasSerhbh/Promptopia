'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'



const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((prompt) => (
                <PromptCard
                    key={prompt._id}
                    post={prompt}
                    handleTagClick={handleTagClick}
                />
            
            ))}
        </div>
    )
}


const Feed = () => {

    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    var handleSearchChange = (e) => {
        setSearchText(e.target.value);


            const filteredPosts = posts.filter((post) => {
            return (
            post.prompt.toLowerCase().includes(searchText.toLowerCase()) 
            || post.creator.username.toLowerCase().includes(searchText.toLowerCase())
            || post.tag.toLowerCase().includes(searchText.toLowerCase())
            )
        })

        setFilteredPosts(filteredPosts);
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setPosts(data);
        }

        fetchData();

    }, [])

    useEffect(() => {
        handleSearchChange({target: {value: searchText}});
    }, [searchText])

    const handleTagClick = (tag) => {
        handleSearchChange({target: {value: tag}});
    }

  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input type='text' placeholder='Search for a tag or a username'
                required
                value={searchText}
                onChange={handleSearchChange}
                className='search_input peer'
            />
        </form>

        <PromptCardList
            data={searchText ? filteredPosts : posts}
            handleTagClick={handleTagClick}
        />

    </section>
  )
}

export default Feed


