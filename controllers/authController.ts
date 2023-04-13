import { Request, Response } from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Category } from "../models/Category";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
export const logUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const same = await bcrypt.compare(password, user.password);
    if (!same) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // USER SESSION
    req.session.userID = user.id;
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export const getDashboardPage = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
  });
};
