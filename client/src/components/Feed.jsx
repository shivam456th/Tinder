  import axios from 'axios'
  import React, { useEffect } from 'react'
  import { BASE_URL } from '../redux/constants'
  import { useDispatch, useSelector } from 'react-redux'
  import { addFeed } from '../redux/FeedSlice'
  import UserCard from './UserCard'
import { Link } from 'react-router-dom'

  const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch()

    const getFeed = async () => {
      if (feed && feed.length > 0) return
      try {
        const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
        dispatch(addFeed(res.data))
        console.log("Feed fetched:", res.data)
      } catch (error) {
        console.error("Failed to fetch feed:", error)
      }
    }

    useEffect(() => {
      getFeed()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!feed) return;

    if (feed.length <= 0) {
      return <h1>No new user Found</h1>
    }

    return (
      <Link to='/feed' className="flex justify-center my-10">
        {feed && feed.length > 0 ? (
          <UserCard user={feed[0]} />
        ) : (
          <p className="text-gray-500">No feed available</p>
        )}
      </Link>
    )
  }

  export default Feed
