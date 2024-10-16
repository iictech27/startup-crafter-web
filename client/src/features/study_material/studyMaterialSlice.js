import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  topics: [],
  subTopics: [],
  units: [],
  modules: [],
  loading: false,
  error: null,
};

//create topics
export const createTopic = createAsyncThunk(
  "studyMaterials/createTopic",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post(
      "/api/v1/admin/study-material/create-topic",
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

//fetch topics
export const fetchAllTopics = createAsyncThunk(
  "studyMaterials/fetchAllTopics",
  async (_, { rejectWithValue }) => {
    // console.log(data);
    const res = await axios.get("/api/v1/user/get-all-topics", {
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

export const studyMaterialSlice = createSlice({
  name: "studyMaterials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //handle fetch all topics
    builder.addCase(fetchAllTopics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTopics.fulfilled, (state, action) => {
      state.loading = false;
      state.topics = action.payload;
    });
    builder.addCase(fetchAllTopics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //handle create topic
    builder.addCase(createTopic.fulfilled, (state) => {
      state.loading = false;
      state.topics.push(action.payload);
    });
  },
});

export const {} = studyMaterialSlice.actions;
export default studyMaterialSlice.reducer;
