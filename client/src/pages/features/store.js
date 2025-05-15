import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Import the authSlice reducer
import postReducer from "./postSlice";
import categoryReducer from "./categorySlice";
import commentReducer from "./commentSlice";
import adminReducer from "./adminSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    category: categoryReducer,
    comments: commentReducer,
    admin: adminReducer,
  },
});

export default store;
