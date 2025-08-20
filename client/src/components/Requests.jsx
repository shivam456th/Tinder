import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../redux/constants'

const Requests = () => {

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            })
            console.log(res.data.data);
            
        } catch (error) {
            //Handle Error Case
        }
    }

    useEffect(()=>{
        fetchConnections
    }, [])

  return (
    <div className='flex justify-center'>
        <h1 className='text-bold'>Connections</h1>
    </div>
  )
}

export default Requests