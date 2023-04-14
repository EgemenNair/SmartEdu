import { Express, Request, Response } from "express";
import { Course } from "../models/Course";
import { Category } from "../models/Category";
import { User } from "../models/User";
import { ObjectId } from "mongoose";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.session.userID);
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
      user,
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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const categories = await Category.find();
    res.status(200).render("course", {
      course,
      categories,
      user,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
export const enrollCourse = async (req: Request, res: Response) => {
  const user = await User.findById(req.session.userID);
  const alreadyEnrolled = user?.courses.includes(req.body.course_id);
  if (!alreadyEnrolled && user?.role === "student") {
    try {
      await user?.courses.push(req.body.course_id);
      await user?.save();
      res.status(200).redirect("/users/dashboard");
    } catch (error) {
      res.status(400).json({
        status: "bad request",
        error,
      });
    }
  } else {
    res.redirect("/users/dashboard");
  }
};

export const dropCourse = async (req: Request, res: Response) => {
  const user = await User.findById(req.session.userID);
  const alreadyEnrolled = user?.courses.includes(req.body.course_id);
  if (alreadyEnrolled && user?.role === "student") {
    try {
      await User.updateOne(
        { _id: user._id },
        { $pull: { courses: req.body.course_id } }
      );
      await user.save();
      res.status(200).redirect("/users/dashboard");
    } catch (error) {
      res.status(400).json({
        status: "bad request",
        error,
      });
    }
  } else {
    res.redirect("/users/dashboard");
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const user = await User.findById(req.session.userID);
  const alreadyEnrolled = user?.courses.includes(req.body.course_id);
  if (alreadyEnrolled && user?.role === "student") {
    try {
      await user?.courses.push(req.body.course_id);
      await user?.save();
      res.status(200).redirect("/users/dashboard");
    } catch (error) {
      res.status(400).json({
        status: "bad request",
        error,
      });
    }
  } else {
    res.redirect("/users/dashboard");
  }
};

export const editCourse = async (req: Request, res: Response) => {
  const user = await User.findById(req.session.userID);
  const alreadyEnrolled = user?.courses.includes(req.body.course_id);
  if (alreadyEnrolled && user?.role === "student") {
    try {
      await user?.courses.push(req.body.course_id);
      await user?.save();
      res.status(200).redirect("/users/dashboard");
    } catch (error) {
      res.status(400).json({
        status: "bad request",
        error,
      });
    }
  } else {
    res.redirect("/users/dashboard");
  }
};
