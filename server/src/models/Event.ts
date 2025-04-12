// server/src/models/Event.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  category: 'exercise' | 'eating' | 'work' | 'relax' | 'family' | 'social';
  date: string;
  startTime: string;
  endTime: string;
  color?: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['exercise', 'eating', 'work', 'relax', 'family', 'social']
  },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  color: { type: String }
});

export default mongoose.model<IEvent>('Event', EventSchema);