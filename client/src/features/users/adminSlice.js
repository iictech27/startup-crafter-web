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
    clearAdmin: (state, action) => {
      state.admin = null;
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
