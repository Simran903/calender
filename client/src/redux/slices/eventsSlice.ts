// client/src/redux/slices/eventsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EventItem } from '../../types';
import axios from 'axios';

interface EventsState {
  events: EventItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('/api/events');
  return response.data;
});

export const addEvent = createAsyncThunk('events/addEvent', async (event: Omit<EventItem, '_id'>) => {
  const response = await axios.post('/api/events', event);
  return response.data;
});

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (event: EventItem) => {
    const response = await axios.put(`/api/events/${event._id}`, event);
    return response.data;
  }
);

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id: string) => {
  await axios.delete(`/api/events/${id}`);
  return id;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch events
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action: PayloadAction<EventItem[]>) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch events';
    });

    // Add event
    builder.addCase(addEvent.fulfilled, (state, action: PayloadAction<EventItem>) => {
      state.events.push(action.payload);
    });

    // Update event
    builder.addCase(updateEvent.fulfilled, (state, action: PayloadAction<EventItem>) => {
      const index = state.events.findIndex((event) => event._id === action.payload._id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    });

    // Delete event
    builder.addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event._id !== action.payload);
    });
  },
});

export default eventsSlice.reducer;