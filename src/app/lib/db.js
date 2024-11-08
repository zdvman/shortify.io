// src/app/lib/db.js
import { linksTable } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { timestamp } from "drizzle-orm/mysql-core";
import { desc, eq } from "drizzle-orm";
import randomShortString from "./randomShortString";

// neonConfig.fetchConnectionCache = true;

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
  const short = randomShortString();
  const newLink = { url: url, short: short };
  let response, responseStatus;
  // INSERT query to add a new row to the links table
  // Inserts the provided values and returns the inserted row

  try {
    response = await db
      .insert(linksTable) // Prepares an INSERT query for the linksTable
      .values(newLink) // Specifies the values to insert (object must match the schema)
      .returning(); // Returns the inserted row(s) (e.g., ID, createdAt)
    responseStatus = 201;
  } catch (error) {
    // Check if the error code is a unique violation
    if (error.code === "23505") {
      responseStatus = 201; // Conflict status code
      // return the existing row from database
      response = await getExistingLinkRecord(url);
    } else {
      responseStatus = 500; // Internal Server Error status code
      response = { error: "Internal Server Error" };
    }
  } finally {
    console.log("finally", response);
    return { data: response, status: responseStatus };
  }
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

// return the record from database if the URL already exists
export async function getExistingLinkRecord(existingURL) {
  return await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.url, existingURL));
}

export async function getShortLinkRecord(shortSlugValue) {
  return await db
    .select() // Initiates a SELECT query (defaults to all columns)
    .from(linksTable) // Specifies the linksTable as the target table
    .where(eq(linksTable.short, shortSlugValue));
}

export async function getMinLinks(limit, offset) {
  const lookUpLimit = limit || 10;
  const lookUpOffset = offset || 0;

  return await db
    .select({
      id: linksTable.id,
      url: linksTable.url,
      timestamp: linksTable.createdAt,
      short: linksTable.short,
    })
    .from(linksTable) // Specifies the linksTable as the target table
    .limit(lookUpLimit) // Limits the result to 10 rows
    .offset(lookUpOffset) // Skips the first 0 rows (no rows skipped)
    // Use .offset() when you need pagination (e.g., skipping the first 10 rows to fetch the next 10 rows)
    .orderBy(desc(linksTable.createdAt)); // Orders the result by createdAt in descending order
}
