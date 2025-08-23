import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
// import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../redux/constants'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { addUser } from '../redux/userSlice'
// import Feed from './Feed'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL+"/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      } 
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
        <Navbar/>
        <Outlet/>
        {/* <Feed/> */}
        {/* <Footer/> */}
    </div>
  )
}

export default Body