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
      //   localStorage.setItem("current-user", action.payload);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
