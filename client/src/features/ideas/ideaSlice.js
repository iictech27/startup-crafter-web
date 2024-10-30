import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ideas: [],
  reviewIdea: null,
  feedbacks: [],
  loading: false,
  error: null,
};

//submit idea
export const submitIdea = createAsyncThunk(
  "users/submitIdea",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post("/api/v1/user/submit-idea", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
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

//get specific user's idea
export const fetchUserIdeas = createAsyncThunk(
  "users/fetchUserIdeas",
  async (data, { rejectWithValue }) => {
    // console.log(data);
    const res = await axios.get("/api/v1/user/get-ideas", data, {
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

//delete specific user's idea
export const deleteUserIdea = createAsyncThunk(
  "users/deleteUserIdea",
  async (data, { rejectWithValue }) => {
    // console.log(data);
    const res = await axios.get("/api/v1/user/delete-idea", data, {
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

//get all ideas
export const fetchAllIdeas = createAsyncThunk(
  "admin/fetchAllIdeas",
  async (_, { rejectWithValue }) => {
    // console.log(data);
    const res = await axios.get("/api/v1/admin/get-all-ideas", {
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

//send feedback to specific idea
export const sendFeedback = createAsyncThunk(
  "admin/sendFeedback",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post("/api/v1/admin/send-idea-feedback", data, {
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

export const ideaSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {
    fetchIdeaForReview: (state, action) => {
      state.reviewIdea = state.ideas.find(
        (idea) => idea.uuid === action.payload
      );
    },
    clearIdeas: (state, action) => {
      state.ideas = [];
    },
  },
  extraReducers: (builder) => {
    //handle fetch all ideas
    builder.addCase(fetchAllIdeas.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllIdeas.fulfilled, (state, action) => {
      state.loading = false;
      state.ideas = action.payload;
    });
    builder.addCase(fetchAllIdeas.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //handle fetch user ideas
    builder.addCase(fetchUserIdeas.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserIdeas.fulfilled, (state, action) => {
      state.loading = false;
      state.ideas = action.payload;
    });
    builder.addCase(fetchUserIdeas.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //handle delete user idea
    builder.addCase(deleteUserIdea.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUserIdea.fulfilled, (state, action) => {
      state.loading = false;
      state.ideas = state.ideas.filter((idea) => action.payload !== idea.uuid);
    });
    builder.addCase(deleteUserIdea.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //handle submit idea
    builder.addCase(submitIdea.fulfilled, (state, action) => {
      state.loading = false;
      state.ideas.push(action.payload);
    });
    //handle sending feedback
    builder.addCase(sendFeedback.fulfilled, (state, action) => {
      state.loading = false;
      state.feedbacks.push(action.payload);
    });
  },
});

export const { fetchIdeaForReview, clearIdeas } = ideaSlice.actions;
export default ideaSlice.reducer;
