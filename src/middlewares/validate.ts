import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// Middleware to validate the request body
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.statusCode = 400;
        throw new Error(JSON.stringify(errorMessages));
      } else {
        res.statusCode = 500;
        throw new Error("Internal server error");
      }
    }
  };
}
