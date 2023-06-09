import express, { Express, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import methodOverride from "method-override";

import * as pageRoute from "./routes/pageRoute";
import * as courseRoute from "./routes/courseRoute";
import * as categoryRoute from "./routes/categoryRoute";
import * as authRoute from "./routes/authRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Connect to DB
mongoose
  .connect(
    "mongodb+srv://nairegemen:MmrzhNwGByTR124q@smartedu.3il686j.mongodb.net/"
  )
  .then(() => {
    console.log(`⚡️[server]: DB connected at mongodb://localhost/smartedu-db`);
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
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://nairegemen:MmrzhNwGByTR124q@smartedu.3il686j.mongodb.net/",
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessage = req.flash();
  next();
});
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
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
