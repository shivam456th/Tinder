import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../redux/constants"; // Make sure this path is correct
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../redux/requestSlice"; // Make sure this path is correct

const Requests = () => {
  // 1. Redux store se 'requests' state ko select karein
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  // 2. useEffect hook API se data fetch karne ke liye
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });
        
        // Debugging ke liye: Check karein ki API se kya data aa raha hai
        console.log("API Response Data:", res.data.data);

        // Agar data hai, toh usko Redux store mein dispatch karein
        if (res.data.data) {
          dispatch(addRequests(res.data.data));
        }
      } catch (error) {
        // Error ko console mein log karein taaki debug kar sakein
        console.error("Error fetching connection requests:", error);
      }
    };

    fetchRequests();
  }, [dispatch]); // dispatch ko dependency array mein add karna acchi practice hai

  // 3. Loading State: Jab tak data fetch ho raha hai
  if (requests === null) {
    return (
      <div className="text-center my-10">
        <h1 className="text-xl font-semibold">Loading Requests...</h1>
      </div>
    );
  }

  // 4. Empty State: Jab koi request na ho
  if (requests.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-xl font-semibold">No New Requests Found</h1>
      </div>
    );
  }

  // 5. Jab data available ho, toh UI render karein
  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-gray-800">
        Connection Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Yahan 'requests.map' use karein, 'connections.map' nahi */}
        {requests.map((request) => {
          // Har request ke 'fromUserId' object se data nikalein
          // Agar inmein se koi field (jaise age) nahi hai, toh woh undefined rahega
          const {
            _id, // User ki unique ID
            firstName,
            lastName,
            photoUrl, // Iska naam API response mein check karein (ho sakta hai 'avatar' ya 'profilePic' ho)
            about,
            age,
            gender,
          } = request.fromUserId;

          return (
            <div
              key={request._id} // Hamesha unique ID use karein, jaise request ki ID
              className="bg-white p-6 shadow-xl rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  className="w-28 h-28 rounded-full ring-4 ring-indigo-200 object-cover"
                  src={photoUrl} // Yahan 'photoUrl' variable use karein
                  alt={`${firstName} ${lastName}`}
                  // Agar image load na ho toh fallback ke liye
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/112x112/E0E7FF/3730A3?text=NA"; }}
                />

                <div className="mt-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm font-semibold text-indigo-600 mt-1">
                    {about || "About"}
                  </p>
                </div>

                {/* Age aur Gender tabhi dikhayein jab woh data mein मौजूद hon */}
                {age && gender && (
                  <p className="text-gray-600 mt-4 text-sm">
                    {`${age} years | ${gender}`}
                  </p>
                )}

                <div className="flex gap-4 mt-6">
                  <button className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
                    Accept
                  </button>
                  <button className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;