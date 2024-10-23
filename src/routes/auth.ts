import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import { loginController, registerController } from "../controllers/auth";
import { validateData } from "../middlewares/validate";
import { loginUserSchema, registerUserSchema } from "../types/auth";

// Create the auth router
const authRouter = Router()
  .post("/login", validateData(loginUserSchema), loginController)
  .post("/register", validateData(registerUserSchema), registerController)
  .get("/me", authenticateToken, (req, res) => {
    // @ts-ignore
    const user = req.user;

    res.json(user);
  });

export default authRouter;
