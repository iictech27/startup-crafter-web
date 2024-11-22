import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  events: [],
  eventDetail: null,
  loading: false,
  error: null,
};

// Add event
export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post("/api/v1/admin/add-event", data, {
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

// Edit event
export const editEvent = createAsyncThunk(
  "events/editEvent",
  async (data, { rejectWithValue }) => {
    const { eventId, eventData, stages, winner, runnerUp } = data;

    try {
      const res = await axios.put(
        `/api/v1/admin/edit-event/${eventId}`,
        eventData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Delete event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/v1/admin/delete-event/${eventId}`, {
        withCredentials: true,
      });
      return eventId;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Fetch all events
// export const fetchAllEvents = createAsyncThunk(
//   "events/fetchAllEvents",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("/api/v1/user/get-all-events", {
//         withCredentials: true,
//         headers: {
//           Accept: "application/json",
//         },
//       });
//       return res.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data || error.message);
//     }
//   }
// );

// Fetch event detail
// export const fetchEventDetail = createAsyncThunk(
//   "events/fetchEventDetail",
//   async (eventId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`/api/v1/user/get-event-detail/${eventId}`, {
//         withCredentials: true,
//         headers: {
//           Accept: "application/json",
//         },
//       });
//       return res.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data || error.message);
//     }
//   }
// );

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    resetEventDetail: (state) => {
      state.eventDetail = null;
    },
  },
  extraReducers: (builder) => {
    // add event
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events.push(action.payload);
    });

    // edit event
    builder.addCase(editEvent.fulfilled, (state, action) => {
      state.loading = false;
      const updatedEvent = action.payload;
      const index = state.events.findIndex(
        (event) => event._id === updatedEvent._id
      );
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    });

    // Delete event
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
    });
  },
});

export const { resetEventDetail } = eventSlice.actions;
export default eventSlice.reducer;
