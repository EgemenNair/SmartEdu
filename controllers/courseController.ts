import { Express, Request, Response } from "express";
import { Course } from "../models/Course";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.status(200).render("courses", {
      courses,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
// export const getCourse = async (
//   req: Request,
//   res: Response,
//   CourseID: Number
// ) => {
//   try {
//     const course = await Course.findOne(CourseID);
//     res.status(201).json({
//       status: "success",
//       course,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "bad request",
//       error,
//     });
//   }
// };
