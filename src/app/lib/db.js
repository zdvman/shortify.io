import { neon } from '@neondatabase/serverless';

// Create sequel client with connection string from environment
const sql = neon(process.env.DATABASE_URL);

// console.log(sql`SELECT NOW()`);

export async function helloWorld() {
  // SELECT NOW() is a simple query
  // that returns the current date and time

  const start = new Date();
  const [dbresponse] = await sql`SELECT NOW();`;
  const dbNow = dbresponse?.now || ''; // returns the current date and time if available
  const end = new Date();
  return { dbNow: dbNow, latency: Math.abs(end - start) };
}
