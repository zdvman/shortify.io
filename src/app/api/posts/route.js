// src/app/api/posts/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, title: 'Hello World' },
      { id: 2, title: 'Hello Next.js' },
      { id: 3, title: 'Hello Vercel' },
    ],
  });
}
/* 
export async function POST() {
	// FORM DATA
	// API JSON POST DATA
	return NextResponse.json({hello: "POST"});
}
 */
