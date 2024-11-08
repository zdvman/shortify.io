import { getShortLinkRecord } from "@/app/lib/db.js";
import { notFound, redirect } from "next/navigation";

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
  const { url } = record;
  if (!url) {
    notFound(); // Return a 404 Not Found response
  }
  redirect(url, "push"); // Redirect to the URL
  return <>{JSON.stringify(record)}</>;
}
