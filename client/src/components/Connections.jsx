import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../redux/connectionSlice'

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            })
            console.log(res.data.data);
            dispatch(addConnections(res.data.data))
        } catch (error) {
            //Handle Error Case
        }
    }

    useEffect(()=>{
        fetchConnections
    }, [])

    if (!connections) return;

    if (connections.length === 0) {
        return <h1>No connections Found</h1>
    }

  return (
    <div className='flex justify-center'>
        <h1 className='text-bold'>Connections</h1>

        {connections.map((connections)=>(
            <div>
                {connections.firstName}
            </div>
        ))}
    </div>
  )
}

export default Connections