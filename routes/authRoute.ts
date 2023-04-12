import express from "express";
import * as authController from "../controllers/authController";

export const router = express.Router();

router.route("/signup").post(authController.createUser);
