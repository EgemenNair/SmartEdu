import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;

interface ICategory {
  name: string;
  slug?: string;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

CategorySchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

export const Category: mongoose.Model<ICategory> = mongoose.model(
  "Category",
  CategorySchema
);
