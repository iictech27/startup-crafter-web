import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  blogDetails: null,
  myBlogs: [],
  savedBlogs: [],
  loading: false,
  error: null,
};

//create blog
export const createBlog = createAsyncThunk(
  "users/createBlog",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post(
      "https://startup-crafter-web-server.onrender.com/api/v1/user/create-blog",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    try {
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

//get all blogs
export const fetchAllBlogs = createAsyncThunk(
  "users/fetchAllBlogs",
  async (_, { rejectWithValue }) => {
    // console.log(data);
    const res = await axios.get(
      "https://startup-crafter-web-server.onrender.com/api/v1/user/get-all-blogs",
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      }
    );

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
        (blog) => action.payload === blog.createdBy.uuid
      );
    },
    fetchUserSavedBlogs: (state, action) => {
      state.savedBlogs = state.blogs.filter((blog) =>
        action.payload.includes(blog.uuid)
      );
    },
    //fetch individual blogs
    fetchIndividualBlog: (state, action) => {
      state.blogDetails = state.blogs.find(
        (blog) => action.payload === blog.slug
      );
    },
    clearBlogs: (state, action) => {
      state.savedBlogs = [];
      state.myBlogs = [];
      state.blogDetails = null;
    },
  },
  extraReducers: (builder) => {
    //handle fetch all blogs
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

    //handle create blog
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs.push(action.payload);
    });
  },
});

export const {
  fetchUserCreatedBlogs,
  fetchUserSavedBlogs,
  fetchIndividualBlog,
  clearBlogs,
} = userBlogSlice.actions;
export default userBlogSlice.reducer;
