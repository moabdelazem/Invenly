import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import authRouter from "./routes/auth";
import { authenticateToken } from "./middlewares/auth";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Create Express server
export const app: Express = express();
export const port = process.env.PORT!;

// Create main app routes
export const mainRouter = express.Router();

// use the JSON parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ? Test route
app.get("/", (req: Request, res: Response) => {
  res.send("This is the REST API");
});

// ? Test auth route
app.get("/test-auth", authenticateToken, (req: Request, res: Response) => {
  res.send("This is the auth route");
});

// use the main router
app.use("/api", mainRouter);

// use the auth router for the /auth route
mainRouter.use("/auth", authRouter);

// use the error handler middleware
app.use(errorHandler);
