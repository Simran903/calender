import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  goalId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true }
});

export default mongoose.model<ITask>('Task', TaskSchema);