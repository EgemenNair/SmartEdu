import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = 3000 || process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Index Page");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
