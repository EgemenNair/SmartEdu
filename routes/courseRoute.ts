import express from "express";
import * as courseController from "../controllers/courseController";

export const router = express.Router();

router.route("/").post(courseController.createCourse);
