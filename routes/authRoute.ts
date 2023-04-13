import express from "express";
import * as authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import redirectMiddleware from "../middlewares/redirectMiddleware";

export const router = express.Router();

router.route("/signup").post(redirectMiddleware, authController.createUser);
router.route("/login").post(redirectMiddleware, authController.logUser);
router.route("/logout").get(authMiddleware, authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);
