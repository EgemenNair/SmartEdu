import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Course } from "../models/Course";
import { validationResult } from "express-validator";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
    res.status(400).redirect("/register");
  }
};
export const logUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid credentials!");
      return res.status(401).redirect("/login");
    } else {
      const same = await bcrypt.compare(password, user.password);
      if (!same) {
        req.flash("error", "Invalid credentials!");
        return res.status(401).redirect("/login");
      }
    }
    // USER SESSION
    req.session.userID = user?.id;
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", "Invalid credentials!");
    res.status(400).redirect("/login");
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export const getDashboardPage = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
  });
};
