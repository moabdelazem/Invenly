import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// get the jwt secret from the environment variables
const JWT_SECRET = process.env.JWT_SECRET!;

// Middleware to authenticate a token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];

  // if there is no token, return an error
  if (!token) {
    res.statusCode = 401;
    throw new Error("No token provided.");
  }

  // verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.statusCode = 403;
      throw new Error("Failed to authenticate token.");
    }

    // @ts-ignore
    req.user = user;
    next();
  });
};
