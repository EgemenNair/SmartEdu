import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import * as pageRoute from "./routes/pageRoute";

dotenv.config();

const app: Express = express();
const port = 3000 || process.env.PORT;

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.use("/", pageRoute.router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
