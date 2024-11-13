import { NextResponse } from "next/server";
import { saveLinkVisit } from "@/app/lib/db";

export async function POST(request) {
  const data = await request.json();
  const { linkId } = data;
  const response = await saveLinkVisit(linkId);
  console.log("save visit response", response);
  return NextResponse.json({}, { status: 201 });
}
