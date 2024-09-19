import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
      // console.log(users);
    },
    clearUser: (state, action) => {
      state.users = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
