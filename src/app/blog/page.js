// src/app/blog/page.js

import getDomain from "@/app/lib/getDomain";
import BlogCard from "./card";

import { helloWorld, db } from "@/app/lib/db";
import { linksTable } from "@/app/lib/schema";

async function addLink(url, short) {
  await db.insert(linksTable).values({ url, short });
}

async function getLinks() {
  const links = await db.select().from(linksTable);
  console.log(links);
}

async function getData() {
  try {
    // 1 endpoint - API?
    const domain = getDomain();
    const endpoint = `${domain}/api/posts`; // -> third party api request??
    // const endpoint = `/api/posts`;
    const res = await fetch(endpoint, {
      // next: { revalidate: 10 }, // Optional: Add revalidation
      cache: "no-store", // Optional: Disable cache
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Fetch response not OK: ${res.status} ${res.statusText}`);
    }

    if (res.headers.get("content-type") !== "application/json") {
      return { items: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { items: [] };
  }
}

export default async function BlogPage() {
  let data;
  let dbresponse;
  try {
    data = await getData();
    dbresponse = await helloWorld();
    console.log("dbresponse :", dbresponse);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
  const items = data && data.items ? [...data.items] : [];
  return (
    <main>
      <h1>Hello World</h1>
      <p>DB Response: {JSON.stringify(dbresponse)}</p>
      <p>Posts:</p>
      {items &&
        items.map((item, idx) => {
          return <BlogCard title={item.title} key={`post-${idx}`} />;
        })}
    </main>
  );
}

export const runtime = "edge";
export const preferredRegion = "iad1";
//available regions: 'auto' | 'global' | 'home' | ['iad1', 'sfo1']
// more information on Route Segment Config: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
