import { Model, Schema, model } from "mongoose";

export interface ITask {
  name: string;
  description: string;
  completed: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  priority?: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  subtasks?: ITask[];
}

/**
 * Represents the schema for a task.
 */
const taskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    dueDate: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
    },
    assignedTo: String,
    subtasks: [Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> = model<ITask>("User", taskSchema);

export default Task;
