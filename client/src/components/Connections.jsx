// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { BASE_URL } from '../redux/constants'
// import { useDispatch, useSelector } from 'react-redux'
// import { addConnections } from '../redux/connectionSlice'

// const Connections = () => {
//     const connections = useSelector((store) => store.connections)
//     const dispatch = useDispatch();

//     const fetchConnections = async () => {
//         try {
//             const res = await axios.get(BASE_URL + "/user/connections", {
//                 withCredentials: true,
//             })
//             console.log(res.data.data);
//             dispatch(addConnections(res.data.data))
//         } catch (error) {
//             console.error("Error fetching connections:", error);
//         }
//     }

//     useEffect(() => {
//         fetchConnections();  // ✅ call properly
//     }, [])

//     if (!connections) return null;

//     if (connections.length === 0) {
//         return <h1>No connections Found</h1>
//     }

//     return (
//         <div className='flex flex-col items-center'>
//             <h1 className='font-bold text-xl mb-4'>Connections</h1>

//             {connections.map((conn, index) => {
//                 // const { firstName, lastName } = conn;
//                 return (
//                     <div key={index} className="p-2 shadow-md rounded-md mb-2">
//                         {firstName} {lastName}
//                     </div>
//                 );
//             })}
//         </div>
//     )
// }

// export default Connections
import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../redux/constants';
import { useDispatch } from 'react-redux';
import { addConnections } from '../redux/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL +"/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log(res.data.data);
      
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className='flex justify-center'>
      <h1 className='text-bold text-xl'>Connections</h1>
      <h2>{}</h2>
    </div>
  );
}

export default Connections