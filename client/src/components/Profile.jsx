import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store) => store.user)

  if (!user) {
    return (
      <div className="flex justify-center my-10 text-gray-500">
        Loading user profile...
      </div>
    )
  }

  return (
    <EditProfile user={user} />
  )
}

export default Profile
