import express from "express";
import * as categoryController from "../controllers/categoryController";

export const router = express.Router();

router.route("/").post(categoryController.createCategory);
