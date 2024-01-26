import { Model, Schema, model } from "mongoose";

export interface ITask {
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents the schema for a task.
 */
const taskSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const Task: Model<ITask> = model<ITask>("User", taskSchema);

export default Task;
