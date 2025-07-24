import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // Update Event
    updateEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEventSuccess: (state, action) => {
      state.currentEvent = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateEventFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete Event
    deleteEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteEventSuccess: (state) => {
      state.currentEvent = null;
      state.loading = false;
      state.error = null;
    },
    deleteEventFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Set Current Event (optional, used for form prefills, etc.)
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },

    // Reset State
    clearEventState: (state) => {
      state.currentEvent = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  updateEventStart,
  updateEventSuccess,
  updateEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
  setCurrentEvent,
  clearEventState,
} = eventSlice.actions;

export default eventSlice.reducer;
