import { Express, Request, Response } from "express";
import { Course } from "../models/Course";

export const createCourse = async (req: Request, res: Response) => {
  const course = await Course.create(req.body);

  try {
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
