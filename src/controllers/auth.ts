import { Request, Response } from "express";
import { db } from "..";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// get the jwt secret from the environment variables
const JWT_SECRET = process.env.JWT_SECRET!;

// Controller to register a new user
export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // check if the user exists in the database
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  // if the user does not exist, return an error
  if (!user) {
    res.statusCode = 401;
    throw new Error("Invalid username or password.");
  }

  // check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // if the password is incorrect, return an error
  if (!isPasswordValid) {
    res.statusCode = 401;
    throw new Error("Invalid username or password.");
  }

  // generate a JWT token
  const token = jwt.sign(
    { username: user.username, userId: user.id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // send the token in the response
  res.json({ token });
};

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // check if the user already exists in the database (username and email must be unique)
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  // if the user already exists, return an error
  if (existingUser) {
    res.statusCode = 400;
    throw new Error("User already exists.");
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create the user in the database
  const user = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  // generate a JWT token
  const token = jwt.sign(
    { username: user.username, userId: user.id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // send the token in the response
  res.json({ token });
};
