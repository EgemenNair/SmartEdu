import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lecturer: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

export const Course: mongoose.Model<{
  name: string;
  description: string;
  createdAt: Date;
  lecturer: string;
  photo: string;
}> = mongoose.model("Course", CourseSchema);
