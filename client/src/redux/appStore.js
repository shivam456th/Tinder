import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // check path

const store = configureStore({
  reducer: {
    user: userReducer, // key should be meaningful
  },
});

export default store;
