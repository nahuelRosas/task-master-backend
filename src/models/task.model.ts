import mongoose, { Model, Schema, model } from "mongoose";

/**
 * Represents a task.
 */
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
  owner: mongoose.Schema.Types.ObjectId;
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
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
    },
    assignedTo: String,
    subtasks: [Schema.Types.Mixed],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Represents a Task model.
 */
const Task: Model<ITask> = model<ITask>("Task", taskSchema);

export default Task;
