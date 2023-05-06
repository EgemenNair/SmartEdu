import { Request, Response } from "express";
import { Category } from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    req.flash("success", "Category created successfully");
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `Category wasn't created successfully: ${error}`);
    res.status(400).redirect("/users/dashboard");
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    req.flash("success", "Category deleted successfully");
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `Couldn't delete category: ${error}`);
    res.status(400).redirect("/users/dashboard");
  }
};
