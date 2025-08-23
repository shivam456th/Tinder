const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <p>{firstName + " " + lastName}</p>
          <p>{age}</p>
          <p>{about}</p>
          <p>{gender}</p>
          <p>{skills}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary bg-pink-600">Interest</button>
            <button className="btn btn-primary bg-red-600">Reject</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;

// import React from "react";
// import { Heart, XCircle, User, Info, Star } from "lucide-react";

// const UserCard = ({ user }) => {
//   const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

//   return (
//     <div className="card bg-white shadow-lg rounded-2xl w-96 overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
//       {/* Profile Image */}
//       <figure className="relative">
//         <img
//           src={photoUrl}
//           alt="Profile"
//           className="w-full h-60 object-cover"
//         />
//         <div className="absolute bottom-2 left-2 bg-pink-600 text-white px-3 py-1 rounded-lg text-sm shadow-md">
//           {age} yrs
//         </div>
//       </figure>

//       {/* Card Body */}
//       <div className="card-body p-5">
//         {/* Name + Gender */}
//         <h2 className="card-title text-lg font-bold flex items-center gap-2">
//           <User className="w-5 h-5 text-pink-600" />
//           <h2 className="text-pink-600">{firstName} {lastName}</h2>
//           <span className="badge badge-outline ml-2 text-pink-600">{gender}</span>
//         </h2>

//         {/* About */}
//         <p className="text-gray-600 flex items-center gap-2 text-sm mt-1">
//           <Info className="w-4 h-4 text-gray-500" /> {about}
//         </p>

//         {/* Skills */}
//         {skills && (
//           <div className="mt-3">
//             <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
//               <Star className="w-4 h-4 text-yellow-500" /> Skills
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {Array.isArray(skills)
//                 ? skills.map((skill, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 shadow-sm"
//                     >
//                       {skill}
//                     </span>
//                   ))
//                 : <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">{skills}</span>}
//             </div>
//           </div>
//         )}

//         {/* Actions */}
//         <div className="card-actions justify-between mt-4">
//           <button className="btn btn-outline btn-error flex items-center gap-2 px-5 rounded-xl">
//             <XCircle className="w-5 h-5" /> Reject
//           </button>
//           <button className="btn btn-outline btn-success flex items-center gap-2 px-5 rounded-xl">
//             <Heart className="w-5 h-5" /> Interest
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;
