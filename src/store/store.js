import { configureStore } from "@reduxjs/toolkit";

import resultReducer from "./resultSlice";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    result: resultReducer,
    auth: authReducer,
    post: postReducer,
    chat: chatReducer,
  },
});

export default store;
