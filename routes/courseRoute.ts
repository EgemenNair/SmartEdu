import express from "express";
import * as courseController from "../controllers/courseController";
import roleMiddleware from "../middlewares/roleMiddleware";

export const router = express.Router();

router
  .route("/")
  .post(roleMiddleware(["lecturer", "admin"]), courseController.createCourse);
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/drop").post(courseController.dropCourse);
router.route("/:slug").delete(courseController.deleteCourse);
router.route("/:slug").put(courseController.editCourse);
