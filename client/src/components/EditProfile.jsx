import React, { useState } from "react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { firstName, lastName, photoUrl, age, gender, about };
    console.log("Updated User:", updatedUser);

    // TODO: call API -> axios.put(BASE_URL + "/profile", updatedUser)
    // toast.success("Profile updated successfully!")
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="form-control">
              <label htmlFor="firstName" className="label">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            {/* Last Name */}
            <div className="form-control">
              <label htmlFor="lastName" className="label">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label htmlFor="photoUrl" className="label">Photo URL</label>
              <input
                type="url"
                id="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            {/* Age */}
            <div className="form-control">
              <label htmlFor="age" className="label"> Age </label>
              <input
                type="url"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            

            {/* Gender */}
            <div className="form-control">
              <label htmlFor="gender" className="label">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* About */}
            <div className="form-control">
              <label htmlFor="about" className="label">About</label>
              <textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
