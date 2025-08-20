import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // check path
import feedReducer from "./FeedSlice"
import connectionReducer from "./connectionSlice";
import Connections from "../redux/connectionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    Connections: connectionReducer,
  },
});

export default store;
  