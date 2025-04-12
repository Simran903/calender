import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../types';
import axios from 'axios';

interface GoalsState {
  goals: Goal[];
  selectedGoalId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  selectedGoalId: null,
  loading: false,
  error: null,
};

// Updated fetchGoals to return only the array of goals
export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const response = await axios.get('/api/goals');
  return response.data.goals; // ✅ Make sure the API returns { goals: [...] }
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    selectGoal: (state, action: PayloadAction<string>) => {
      state.selectedGoalId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
      state.goals = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchGoals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch goals';
    });
  },
});

export const { selectGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
