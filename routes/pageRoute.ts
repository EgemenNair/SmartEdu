import express from "express";
import * as pageController from "../controllers/pageController";
import redirectMiddleware from "../middlewares/redirectMiddleware";

export const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/contact").get(pageController.getContactPage);
router
  .route("/register")
  .get(redirectMiddleware, pageController.getRegisterPage);
router.route("/login").get(redirectMiddleware, pageController.getLoginPage);
