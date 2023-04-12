import express from "express";
import * as authController from "../controllers/authController";

export const router = express.Router();

router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.logUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authController.getDashboardPage);
