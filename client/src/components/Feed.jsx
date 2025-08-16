import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../redux/FeedSlice'
import { useEffect } from 'react'
import userCard from '../components/userCard'


const Feed = () => {
    const feed = useSelector((store)=> store.feed)
const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return
        try {
            const res = await axios.get(BASE_URL+"/feed", {
                withCredentials: true
            });
        dispatch(addFeed(res.data))
        } catch (error) {
            //TODO: Handle error
        }
    }

    useEffect(()=>{
        getFeed()
    },[])

  return (
    <div>
        <userCard/>
    </div>
  )
}

export default Feed