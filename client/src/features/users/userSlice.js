import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: null,
  loading: false,
  error: null,
};

//follow
export const followUser = createAsyncThunk(
  "users/followUser",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post("/api/v1/user/follow-user", data, {
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

//save blogs
export const saveBlog = createAsyncThunk(
  "users/saveBlog",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post("/api/v1/user/save-blog", data, {
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

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    clearUser: (state, action) => {
      state.users = null;
    },
  },
  extraReducers: (builder) => {
    //handle save blog
    builder.addCase(saveBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.users.savedBlogs.push(action.payload);
    });
    builder.addCase(saveBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //handle follow user
    builder.addCase(followUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.following.push(action.payload);
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
