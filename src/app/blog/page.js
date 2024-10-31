// src/app/blog/page.js

import getDomain from '@/app/lib/getDomain';

// fetch caching options

// force-cache

// revalidate: n seconds
// no-store

async function getData() {
  if (typeof window === 'undefined') {
    // If in server-side (prerender), return fallback data
    return { items: [] };
  }

  // 1. API endpoints
  const domain = getDomain();
  const endpoint = `${domain}/api/posts`;
  const res = await fetch(endpoint, { next: { revalidate: 10 } });

  if (!res.ok) throw new Error('Failed to fetch data!');

  if (res.headers.get('content-type') !== 'application/json') {
    return { items: [] };
  }
  const data = await res.json();
  return data;
  // return { items: [] };
}

export default async function BlogPage() {
  const data = await getData();
  const items = data && data.items ? [...data.items] : [];
  // console.log(items);
  // console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  return (
    <main>
      <h1>Hello World</h1>
      <p>Posts:</p>
      {items &&
        items.map((item, idx) => {
          return <li key={`post-${idx}`}>{item.title}</li>;
        })}
    </main>
  );
}
