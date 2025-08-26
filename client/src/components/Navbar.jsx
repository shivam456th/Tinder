import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../redux/constants'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../redux/userSlice' // make sure this import is there

const Navbar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToHome = () => {
    navigate("/feed");
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      dispatch(removeUser())
      navigate("/")
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="form-control">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">Profile</Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">Connections</Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">Connection  Requests</Link>
              </li>
              <li><div onClick={goToHome}>Feed</div></li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
