import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../src/redux/constants'
import axios from 'axios' // Import axios for HTTP requests
import {Link , useNavigate} from 'react-router-dom'

const Navbar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
      dispatch(removeUser())
    } catch (error) {
      navigate("/")
      console.error("Failed to logout:", error);
    }
  }
  console.log(user);
  
  return (
    <div>
        <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  {user && (<div className="flex gap-2">
    <div className='form-control'> Welcome, {user.firstName}</div>
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={`https://github.com/shivam456th/profile-images/blob/main/IMG_9747.JPG?raw=true`} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
    </div>
  )
}

export default Navbar