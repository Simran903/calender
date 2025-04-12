import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventItem } from '../../types';

interface UiState {
  isModalOpen: boolean;
  selectedDate: string | null;
  selectedStartTime: string | null;
  selectedEndTime: string | null;
  selectedEvent: EventItem | null;
  isDragging: boolean;
  draggedTask: { id: string; title: string; color: string } | null;
}

const initialState: UiState = {
  isModalOpen: false,
  selectedDate: null,
  selectedStartTime: null,
  selectedEndTime: null,
  selectedEvent: null,
  isDragging: false,
  draggedTask: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{
      date?: string;
      startTime?: string;
      endTime?: string;
      event?: EventItem;
    }>) => {
      state.isModalOpen = true;
      state.selectedDate = action.payload.date || null;
      state.selectedStartTime = action.payload.startTime || null;
      state.selectedEndTime = action.payload.endTime || null;
      state.selectedEvent = action.payload.event || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedDate = null;
      state.selectedStartTime = null;
      state.selectedEndTime = null;
      state.selectedEvent = null;
    },
    setDraggedTask: (state, action: PayloadAction<{ id: string; title: string; color: string } | null>) => {
      state.draggedTask = action.payload;
      state.isDragging = !!action.payload;
    },
  },
});

export const { openModal, closeModal, setDraggedTask } = uiSlice.actions;
export default uiSlice.reducer;