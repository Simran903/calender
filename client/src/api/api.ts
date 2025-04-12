// client/src/api/api.ts
import axios from 'axios';
import { EventItem, Goal, Task } from '../types';

const API_URL = '/api';

export const eventsApi = {
  getAll: async (): Promise<EventItem[]> => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  },
  
  create: async (event: Omit<EventItem, '_id'>): Promise<EventItem> => {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
  },
  
  update: async (event: EventItem): Promise<EventItem> => {
    const response = await axios.put(`${API_URL}/events/${event._id}`, event);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/events/${id}`);
  }
};

export const goalsApi = {
  getAll: async (): Promise<Goal[]> => {
    const response = await axios.get(`${API_URL}/goals`);
    return response.data;
  }
};

export const tasksApi = {
  getByGoal: async (goalId: string): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/goals/${goalId}/tasks`);
    return response.data;
  }
};