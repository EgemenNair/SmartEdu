import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "student" | "lecturer" | "admin";
  courses: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "lecturer", "admin"],
    default: "student",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

UserSchema.pre<IUser>("save", function (next: Function) {
  const user = this;
  bcrypt.hash(user.password, 12, (error, hash) => {
    user.password = hash;
    next();
  });
});

export const User: mongoose.Model<IUser> = mongoose.model<IUser>(
  "User",
  UserSchema
);
