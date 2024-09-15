import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
