import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: null,
};

export const userBlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    createBlog: (state, action) => {
      state.blogs = action.payload;
      // console.log(users);
    },
    editBlog: (state, action) => {
      state.blogs = action.payload;
    },
    deleteBlog: (state, action) => {
      state.blogs = null;
    },
  },
});

export const { createBlog, editBlog, deleteBlog } = userBlogSlice.actions;
export default userBlogSlice.reducer;
