import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import * as pageRoute from "./routes/pageRoute";
import * as courseRoute from "./routes/courseRoute";

dotenv.config();

const app: Express = express();
const port = 3000 || process.env.PORT;

// Connect to DB
mongoose.connect("mongodb://localhost/smartedu-db").then(() => {
  console.log(`⚡️[server]: DB connected at http://localhost/smartedu-db`);
});

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing

// Routes
app.use("/", pageRoute.router);
app.use("/courses", courseRoute.router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
