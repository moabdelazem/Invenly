import { PrismaClient } from "@prisma/client";
import { app, port } from "./app";

// Create a new Prisma client instance
export const db = new PrismaClient();

// Start the server and connect to the database
async function startServer() {
  try {
    // test the database connection
    await db.$connect();
    console.log("Database connected successfully.");
    console.log(`Server started on http://localhost:${process.env.PORT!}`);
  } catch (error) {
    // log the error and exit the process
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

// Start the server on the specified port
app.listen(process.env.PORT, startServer);
