import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get the status code of the error or set it to 500 if there is none
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // set the status code of the response
  const responseBody = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    statusCode,
  };

  console.error("Error: ", responseBody);
  res.json(responseBody);
}

export default errorHandler;
