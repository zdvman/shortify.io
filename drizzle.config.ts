import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Explicitly load the .env.local file
dotenv.config({ path: "./.env.local" });

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debugging output

export default defineConfig({
  out: "./src/migrations",
  schema: "./src/app/lib/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Use the loaded environment variable
  },
});
