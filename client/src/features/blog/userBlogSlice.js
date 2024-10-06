import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  myBlogs: [],
  savedBlogs: [],
  loading: false,
  error: null,
};

//fetch all blogs
export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async (_, { rejectWithValue }) => {
    const res = await axios.get("/api/v1/user/get-all-blogs", {
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    });

    try {
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const userBlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    fetchUserCreatedBlogs: (state, action) => {
      state.myBlogs = state.blogs.filter(
        (blog) => action.payload === blog.createdBy._id
      );
    },
    fetchUserSavedBlogs: (state, action) => {
      state.savedBlogs = state.blogs.filter((blog) =>
        action.payload.includes(blog._id)
      );
    },
    clearBlogs: (state, action) => {
      state.blogs = [];
      state.savedBlogs = [];
      state.myBlogs = [];
    },
  },
  extraReducers: (builder) => {
    // handling fetch all blogs
    builder.addCase(fetchAllBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    });
    builder.addCase(fetchAllBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { fetchUserCreatedBlogs, fetchUserSavedBlogs, clearBlogs } =
  userBlogSlice.actions;
export default userBlogSlice.reducer;
