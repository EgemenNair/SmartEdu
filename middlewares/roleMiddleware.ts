import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";
import multer from "multer";

const upload = multer();

export default (roles: IUser["role"][]) => {
  return (
    upload.none(),
    (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.body?.role;
      if (!userRole) {
        return res
          .status(400)
          .json({ message: "Role is missing from request body" });
      }
      if (roles.includes(userRole)) {
        next();
      } else {
        res.status(401).send("You don't have the neccesary privilages!");
      }
    }
  );
};
