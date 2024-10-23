import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Create Express server
export const app: Express = express();
export const port = process.env.PORT || 3000;

// ? Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
