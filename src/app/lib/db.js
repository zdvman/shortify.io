// src/app/lib/db.js
import { linksTable } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { timestamp } from "drizzle-orm/mysql-core";
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
  // INSERT query to add a new row to the links table
  // Inserts the provided values and returns the inserted row
  return await db
    .insert(linksTable) // Prepares an INSERT query for the linksTable
    .values(newLink) // Specifies the values to insert (object must match the schema)
    .returning(); // Returns the inserted row(s) (e.g., ID, createdAt)
}

export async function getLinks(limit, offset) {
  const lookUpLimit = limit || 10;
  const lookUpOffset = offset || 0;
  // SELECT query to fetch data from the links table
  // Fetches up to 10 rows starting from the first row (offset 0)
  return await db
    .select() // Initiates a SELECT query (defaults to all columns)
    .from(linksTable) // Specifies the linksTable as the target table
    .limit(lookUpLimit) // Limits the result to 10 rows
    .offset(lookUpOffset); // Skips the first 0 rows (no rows skipped)
  // Use .offset() when you need pagination (e.g., skipping the first 10 rows to fetch the next 10 rows)
}

export async function getMinLinks(limit, offset) {
  const lookUpLimit = limit || 10;
  const lookUpOffset = offset || 0;

  return await db
    .select({
      id: linksTable.id,
      url: linksTable.url,
      timestamp: linksTable.createdAt,
    })
    .from(linksTable) // Specifies the linksTable as the target table
    .limit(lookUpLimit) // Limits the result to 10 rows
    .offset(lookUpOffset); // Skips the first 0 rows (no rows skipped)
  // Use .offset() when you need pagination (e.g., skipping the first 10 rows to fetch the next 10 rows)
}
