import { Request, Response } from "express";
import session from "express-session";
import { User } from "../models/User";
import bcrypt from "bcrypt";

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
export const getUser = async (req: Request, res: Response) => {
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
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
