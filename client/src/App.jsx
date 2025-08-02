import React from 'react'
import Profile from './Profile'
import Login from './Login'
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from './redux/appStore';
import Body from './Body';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Provider store={appStore}>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
    </Provider>
    </>
  )
}

export default App;
