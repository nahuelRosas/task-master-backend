import { Model, Schema, model } from "mongoose";
import { ITask } from "./task.model";

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  bio?: string;
  role: "user" | "admin";
  lastLogin?: Date;
  tasks?: ITask[];
}

/**
 * Represents the user schema.
 */
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 120,
    },
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 30,
    },
    avatarUrl: String,
    bio: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    lastLogin: Date,
    tasks: [Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
