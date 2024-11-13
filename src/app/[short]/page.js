import { getShortLinkRecord } from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
import getDomain from "../lib/getDomain";
import { Trirong } from "next/font/google";

async function triggerVisit(linkId) {
  const domain = getDomain();
  const endpoint = `${domain}/api/visits`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ linkId }),
  };
  return await fetch(endpoint, options);
}

export default async function ShortPage({ params }) {
  const { short } = await params;
  if (!short) {
    notFound(); // Return a 404 Not Found response
  }
  const [record] = await getShortLinkRecord(short);
  if (!record) {
    notFound(); // Return a 404 Not Found response
  }
  console.log(record);
  const { url, id } = record;
  if (!url) {
    notFound(); // Return a 404 Not Found response
  }
  if (id) {
    await triggerVisit(id);
  }

  // redirect(url, "push"); // Redirect to the URL
  return (
    <div>
      <h1>{url}</h1>
    </div>
  );
  // <>{JSON.stringify(record)}</>;
}
