// app/api/links/route.js

import { NextResponse } from "next/server";
import isValidURL from "@/app/lib/isValidURL";
import { addLink, getMinLinks, db } from "@/app/lib/db";

// GET /api/links

export async function GET() {
  const links = await getMinLinks(100, 0);
  return NextResponse.json(links, { status: 200 });
}

// POST /api/links
export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type"); // Get the content type
    console.log("Content-type:", contentType);

    if (!contentType || !contentType.includes("application/json")) {
      // Check if the content type is not JSON
      return NextResponse.json({ error: "Bad request" }, { status: 400 }); // Return a 400 Bad Request response
    }

    let requestData; // Request data
    try {
      requestData = await request.json(); // Parse the request body as JSON
    } catch (error) {
      // Catch any JSON parsing errors
      console.error("Invalid JSON in request body:", error);
      return NextResponse.json(
        // Return a 400 Bad Request response
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const url = requestData && requestData.url ? requestData.url : null; // Get the URL from the request body

    if (!url) {
      // Check if the URL is missing
      return NextResponse.json(
        // Return a 400 Bad Request response
        { error: "URL is missing in the request body." },
        { status: 400 }
      );
    }

    const validURL = await isValidURL(url, [
      "shortify",
      process.env.NEXT_PUBLIC_VERCEL_URL,
    ]); // return true if the URL is valid
    if (!validURL) {
      // Check if the URL is not valid
      return NextResponse.json(
        // Return a 400 Bad Request response
        { error: `The provided URL - ${url} is not valid.` },
        { status: 400 }
      );
    }

    const dbResponse = await addLink(url.toLowerCase()); // Add the URL to the database (convert to lowercase)

    const responseData = dbResponse && dbResponse.data ? dbResponse.data : {}; // Get the data from the database response
    const responseStatus =
      dbResponse && dbResponse.status ? dbResponse.status : 500; // Get the status from the database response

    // Proceed with processing the valid URL (e.g., shortening it)
    // For now, return the URL as a placeholder
    return NextResponse.json(responseData, { status: responseStatus });
  } catch (error) {
    // Catch any unexpected errors
    console.error("Server error:", error);
    return NextResponse.json(
      // Return a 500 Internal Server Error response
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
