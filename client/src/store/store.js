import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import adminReducer from "../features/users/adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
