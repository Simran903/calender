export type EventCategory = 'exercise' | 'eating' | 'work' | 'relax' | 'family' | 'social';

export interface EventItem {
  _id: string;
  title: string;
  category: EventCategory;
  date: string;
  startTime: string;
  endTime: string;
  color?: string;
}

export interface Goal {
  _id: string;
  title: string;
  color: string;
}

export interface Task {
  _id: string;
  title: string;
  goalId: string;
  color?: string;
}