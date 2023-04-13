import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;

interface ICourse {
  name: string;
  description: string;
  createdAt: Date;
  lecturer: mongoose.Schema.Types.ObjectId;
  slug?: string;
  category?: mongoose.Types.ObjectId;
}

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

CourseSchema.pre<ICourse>("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

export const Course: mongoose.Model<ICourse> = mongoose.model<ICourse>(
  "Course",
  CourseSchema
);
