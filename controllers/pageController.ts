import { Express, Request, Response } from "express";

export const getIndexPage = (req: Request, res: Response) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

export const getAboutPage = (req: Request, res: Response) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

export const getRegisterPage = (req: Request, res: Response) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

export const getLoginPage = (req: Request, res: Response) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};
