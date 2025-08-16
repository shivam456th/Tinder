import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // check path
import feedReducer from "./FeedSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer
  },
});

export default store;
  