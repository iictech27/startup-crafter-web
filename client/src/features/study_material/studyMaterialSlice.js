import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  topics: [],
  subTopics: [],
  subTopicDetail: null,
  unitDetail: null,
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

//create subtopics
export const createSubTopic = createAsyncThunk(
  "studyMaterials/createSubTopic",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post(
      "/api/v1/admin/study-material/create-subtopic",
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

//fetch subtopics
export const fetchSubTopics = createAsyncThunk(
  "studyMaterials/fetchSubTopics",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.get(`/api/v1/user/get-subtopics/${data}`, {
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
  reducers: {
    //fetch subtopic detail page
    fetchSubTopicDetail: (state, action) => {
      state.subTopicDetail = state.subTopics.find(
        (st) => st.slug === action.payload
      );
    },

    //fetch unit details page
    fetchUnitDetail: (state, action) => {
      state.unitDetail = state.subTopicDetail.units.find(
        (unit) => unit.slug === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    //handle fetch all topics
    builder.addCase(fetchAllTopics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTopics.fulfilled, (state, action) => {
      state.loading = false;
      state.topics = action.payload;
      state.subTopicDetail = null;
      state.unitDetail = null;
    });
    builder.addCase(fetchAllTopics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //handle fetch all subtopics
    builder.addCase(fetchSubTopics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSubTopics.fulfilled, (state, action) => {
      state.loading = false;
      state.subTopics = action.payload.map((ap) => {
        return { topic: ap.topic, ...ap._doc };
      });
      state.subTopicDetail = null;
      state.unitDetail = null;
    });
    builder.addCase(fetchSubTopics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //handle create topic
    builder.addCase(createTopic.fulfilled, (state) => {
      state.loading = false;
      state.topics.push(action.payload);
    });

    //handle create subtopic
    builder.addCase(createSubTopic.fulfilled, (state) => {
      state.loading = false;
      state.subTopics.push(action.payload);
    });
  },
});

export const { fetchSubTopicDetail, fetchUnitDetail } =
  studyMaterialSlice.actions;
export default studyMaterialSlice.reducer;
