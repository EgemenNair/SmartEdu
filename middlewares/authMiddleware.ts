import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await req.session.userID;
    if (!user) {
      return res.redirect("/login");
    }
    next();
  } catch (err) {
    next(err);
  }
};
