import { Express, Request, Response } from "express";
import { Course } from "../models/Course";
import { Category } from "../models/Category";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};
    if (categorySlug) {
      filter = { category: category?._id };
    }

    const courses = await Course.find(filter).populate("user").sort("name");
    const categories = await Category.find();

    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
export const getCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const categories = await Category.find();
    res.status(200).render("course", {
      course,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
