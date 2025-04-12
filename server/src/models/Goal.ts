import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  title: string;
  color: string;
}

const GoalSchema: Schema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true }
});

export default mongoose.model<IGoal>('Goal', GoalSchema);