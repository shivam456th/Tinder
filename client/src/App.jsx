import React from 'react'
import Profile from './components/Profile'
import Login from './components/Login'
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from './redux/appStore';
import Body from './components/Body';
import { Toaster } from 'react-hot-toast';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';

const App = () => {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Provider store={appStore}>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/connections' element={<Connections />} />
            <Route path='/requests' element={<Requests />} />
          </Route>
        </Routes>
    </Provider>
    </>
  )
}

export default App;
