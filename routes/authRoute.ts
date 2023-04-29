import express from "express";
import * as authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import redirectMiddleware from "../middlewares/redirectMiddleware";
import { body } from "express-validator";
import { User } from "../models/User";

export const router = express.Router();

router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Please enter your name  "),
    body("email")
      .isEmail()
      .withMessage("Please enter valid Email  ")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email is already taken !");
          }
        });
      }),
    body("password").not().isEmpty().withMessage("Please enter a password  "),
  ],
  redirectMiddleware,
  authController.createUser
);
router.route("/login").post(redirectMiddleware, authController.logUser);
router.route("/logout").get(authMiddleware, authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);
