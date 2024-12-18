import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  events: [],
  upcomingEvents: [],
  pastEvents: [],
  eventDetail: null,
  loading: false,
  error: null,
};

// Add upcoming event
export const addUpcomingEvent = createAsyncThunk(
  "events/addUpcomingEvent",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post(
      "https://startup-crafter-web-server.onrender.com/api/v1/admin/add-upcoming-event",
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

// Add past event
export const addPastEvent = createAsyncThunk(
  "events/addPastEvent",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const res = await axios.post(
      "https://startup-crafter-web-server.onrender.com/api/v1/admin/add-past-event",
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

// Edit past event
export const editPastEvent = createAsyncThunk(
  "events/editPastEvent",
  async (data, { rejectWithValue }) => {
    const { eventId } = data;

    try {
      const res = await axios.put(
        `https://startup-crafter-web-server.onrender.com/api/v1/admin/edit-past-event/${eventId}`,
        data,
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

// Edit upcoming event
export const editUpcomingEvent = createAsyncThunk(
  "events/editEvent",
  async (data, { rejectWithValue }) => {
    const { eventId } = data;

    try {
      const res = await axios.put(
        `https://startup-crafter-web-server.onrender.com/api/v1/admin/edit-upcoming-event/${eventId}`,
        data,
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
      const res = await axios.delete(
        `http://localhost:8000/api/v1/admin/delete-event/${eventId}`,
        {
          withCredentials: true,
        }
      );
      return eventId;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Fetch upcoming events
export const fetchUpcomingEvents = createAsyncThunk(
  "events/fetchUpcomingEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://startup-crafter-web-server.onrender.com/api/v1/user/get-upcoming-events",
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Fetch past events
export const fetchPastEvents = createAsyncThunk(
  "events/fetchPastEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://startup-crafter-web-server.onrender.com/api/v1/user/get-past-events",
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    fetchUpcomingEventDetail: (state, action) => {
      state.eventDetail = state.upcomingEvents.find(
        (event) => event.slug === action.payload
      );
    },
    fetchPastEventDetail: (state, action) => {
      state.eventDetail = state.pastEvents.find(
        (event) => event.slug === action.payload
      );
    },
    resetEvents: (state) => {
      state.events = [];
      state.upcomingEvents = [];
      state.pastEvents = [];
    },
    resetEventDetail: (state) => {
      state.eventDetail = null;
    },
  },
  extraReducers: (builder) => {
    // add upcoming event
    builder.addCase(addUpcomingEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    // add past event
    builder.addCase(addPastEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });

    // edit event
    // builder.addCase(editEvent.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const updatedEvent = action.payload;
    //   const index = state.events.findIndex(
    //     (event) => event._id === updatedEvent._id
    //   );
    //   if (index !== -1) {
    //     state.events[index] = updatedEvent;
    //   }
    // });

    // Delete event
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
    });

    // Fetch upcoming event
    builder.addCase(fetchUpcomingEvents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.upcomingEvents = action.payload;
    });
    builder.addCase(fetchUpcomingEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch past event
    builder.addCase(fetchPastEvents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPastEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.pastEvents = action.payload;
    });
    builder.addCase(fetchPastEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  fetchUpcomingEventDetail,
  fetchPastEventDetail,
  resetEvents,
  resetEventDetail,
} = eventSlice.actions;
export default eventSlice.reducer;
