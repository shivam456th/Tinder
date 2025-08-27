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
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../redux/connectionSlice';

const Connections = () => {
  const connections = useSelector((store)=> store.connection);
  const dispatch = useDispatch();
  console.log(connections)

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL +"/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) return <h1>No Connections Found</h1>

  return (
    <div className='flex flex-col items-center my-10 px-4'>
  {/* Heading ko thoda aur prominent banaya hai */}
  <h1 className='font-bold text-3xl md:text-4xl mb-8 text-gray-800'>Connections</h1>
  
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
    {connections.map((connection) => {
      const { firstName, lastName, photoUrl, about, age, gender } = connection;

      return (
        <div 
          key={firstName + lastName} 
          // Card design ko premium look diya gaya hai
          className="bg-white p-6 shadow-xl rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="flex flex-col items-center">
            
            {/* Profile Picture ko highlight kiya hai */}
            <img 
              className='w-28 h-28 rounded-full ring-4 ring-indigo-200 object-cover' 
              src={photoUrl} 
              alt={`${firstName} ${lastName}`} 
            />
            
            {/* Naam aur Role section */}
            <div className='text-center mt-4'>
              <h2 className='text-xl font-bold text-gray-900'>{firstName} {lastName}</h2>
              <p className='text-sm font-semibold text-indigo-600 mt-1'>
                {about || ''} {/* Default role agar data mein nahi hai */}
              </p>
            </div>
            
            {/* About Section (fixed height ke saath) */}
            <p className='text-center text-gray-600 mt-4 text-sm leading-relaxed h-16 overflow-hidden'>
              {gender}, {age} years old
            </p>

           
          </div>
        </div>
      );
    })}
  </div>
</div>
  );
}

export default Connections