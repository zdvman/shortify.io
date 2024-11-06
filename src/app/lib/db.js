// src/app/lib/db.js
import { linksTable } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
neonConfig.fetchConnectionCache = true;

// Initialize the Neon client
const sql = neon(process.env.DATABASE_URL);

// Initialize Drizzle ORM with the Neon client
export const db = drizzle(sql);

// export async function helloWorld() {
//   // SELECT NOW() is a simple query
//   // that returns the current date and time

//   const start = new Date();
//   const [dbresponse] = await sql`SELECT NOW();`;
//   const dbNow = dbresponse?.now || ""; // returns the current date and time if available
//   const end = new Date();
//   return { dbNow: dbNow, latency: Math.abs(end - start) };
// }

// async function configureDatabase() {
//   const dbresponse = await sql`CREATE TABLE IF NOT EXISTS "links" (
// 	"id" serial PRIMARY KEY NOT NULL,
// 	"url" text NOT NULL,
// 	"created_at" timestamp DEFAULT now()
// 	)`;
//   console.log("DB Response for new table: ", dbresponse);
// }

// configureDatabase().catch((error) => {
//   console.error("Error configuring database:", error);
// });

export async function addLink(url) {
  const newLink = { url: url };
  return await db.insert(linksTable).values(newLink).returning();
}
