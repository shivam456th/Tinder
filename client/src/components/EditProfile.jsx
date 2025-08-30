import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { BASE_URL } from "../redux/constants";
import { User, Image, Calendar, Info, Save, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false)

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
      },3000);
      // navigate("/feed")
    } catch (error) {
      setError(error.message);
      console.error("Profile update failed:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { firstName, lastName, photoUrl, age, gender, about };
    console.log("Updated User:", updatedUser);
  };

  return (
    <>
    <div className="flex justify-center items-center gap-10 px-5 my-10">
      {/* Form Section */}
      <div className="w-full lg:w-96 p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <UserCheck className="w-6 h-6 text-pink-600" /> Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First + Last Name in one row */}
          <div className="flex gap-3">
            <div className="w-1/2 relative">
              <User className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full rounded-xl pl-9"
              />
            </div>
            <div className="w-1/2 relative">
              <User className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full rounded-xl pl-9"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="relative">
            <Image className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
            <input
              type="url"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full rounded-xl pl-9"
            />
          </div>

          {/* Age + Gender */}
          <div className="flex gap-3">
            <div className="w-1/2 relative">
              <Calendar className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full rounded-xl pl-9"
              />
            </div>
            <div className="w-1/2 relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full rounded-xl"
              >
                <option value="">Gender</option>
                <option value="male">♂ Male</option>
                <option value="female">♀ Female</option>
                <option value="other">⚧ Other</option>
              </select>
            </div>
          </div>

          {/* About */}
          <div className="relative">
            <Info className="w-4 h-4 absolute top-3 left-3 text-gray-400" />
            <textarea
              placeholder="Tell something about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full rounded-xl pl-9"
              rows="3"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            onClick={saveProfile}
            className="btn w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" /> Save Profile
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>

      {/* Live Preview */}
      <UserCard
        user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
      />
    </div>
    {showToast && (
      <div className="toast toast-top toast-center">
      <div className="alert alert-success bg-yellow-400 text-white">
        <span>Profile Saved successfully.</span>
      </div>
    </div>
    )}
    </>
  );
};

export default EditProfile;
