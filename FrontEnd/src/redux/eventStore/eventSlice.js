import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = '/api/events';

// Approve event
export const approveEvent = createAsyncThunk(
  'event/approveEvent',
  async (eventId, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/approve/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to approve event');
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Reject event
export const rejectEvent = createAsyncThunk(
  'event/rejectEvent',
  async (eventId, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/reject/${eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to reject event');
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update event
export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to update event');
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Delete event
export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (eventId, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/delete/${eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to delete event');
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    approvedEvent: null,
    rejectedEvent: null,
    updatedEvent: null,
    deletedEvent: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetEventState: (state) => {
      state.approvedEvent = null;
      state.rejectedEvent = null;
      state.updatedEvent = null;
      state.deletedEvent = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Approve
    builder
      .addCase(approveEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedEvent = action.payload;
        state.success = true;
      })
      .addCase(approveEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Reject
    builder
      .addCase(rejectEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.rejectedEvent = action.payload;
        state.success = true;
      })
      .addCase(rejectEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update
    builder
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedEvent = action.payload;
        state.success = true;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedEvent = action.payload;
        state.success = true;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetEventState } = eventSlice.actions;

export default eventSlice.reducer;
