// 'use client'

import getDomain from '@/app/lib/getDomain';

async function getData() {
  // 1. API endpoints
  const domain = getDomain();
  const endpoint = `${domain}/api/posts`;
  const res = await fetch(endpoint);

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
  console.log(items);
  console.log(process.env.PUBLIC_DOMAIN);
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
