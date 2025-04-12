import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';
import axios from 'axios';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasksByGoal = createAsyncThunk(
  'tasks/fetchTasksByGoal',
  async (goalId: string) => {
    const response = await axios.get(`/api/goals/${goalId}/tasks`);
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByGoal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasksByGoal.fulfilled, (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchTasksByGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch tasks';
    });
  },
});

export default tasksSlice.reducer;