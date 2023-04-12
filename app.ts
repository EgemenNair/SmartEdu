import express, { Express, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";

import * as pageRoute from "./routes/pageRoute";
import * as courseRoute from "./routes/courseRoute";
import * as categoryRoute from "./routes/categoryRoute";
import * as authRoute from "./routes/authRoute";

dotenv.config();

const app: Express = express();
const port = 3000 || process.env.PORT;

// Connect to DB
mongoose.connect("mongodb://localhost/smartedu-db").then(() => {
  console.log(`⚡️[server]: DB connected at http://localhost/smartedu-db`);
});

// Template Engine
app.set("view engine", "ejs");

// Global Variable
let userIN: string | null | undefined = null;

// Middlewares
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
  })
);
// Routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  res.locals.userIN = userIN;
  next();
});
app.use("/", pageRoute.router);
app.use("/courses", courseRoute.router);
app.use("/categories", categoryRoute.router);
app.use("/users", authRoute.router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
