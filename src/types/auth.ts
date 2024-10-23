import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;

// Define the schema for the register request
export const registerUserSchema = z.object({
  username: z.string().min(3).max(255).regex(usernameRegex),
  password: z.string().min(6).max(255),
  email: z.string().email().regex(emailRegex),
});

// Define the schema for the login request
export const loginUserSchema = z.object({
  username: z.string().min(3).max(255).regex(usernameRegex),
  password: z.string().min(6).max(255),
});
