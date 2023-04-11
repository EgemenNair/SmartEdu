import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = 3000 || process.env.PORT;

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).render("index", {
    page_name: "index",
  });
});
app.get("/about", (req: Request, res: Response) => {
  res.status(200).render("about", {
    page_name: "about",
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
