// src/app/blog/page.js

import getDomain from '@/app/lib/getDomain';
import BlogCard from './card';

async function getData() {
  try {
    // 1 endpoint - API?
    const domain = getDomain();
    const endpoint = `${domain}/api/posts`; // -> third party api request??
    const res = await fetch(endpoint, {
      // next: { revalidate: 10 }, // Optional: Add revalidation
      cache: 'no-store', // Optional: Disable cache
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Fetch response not OK:', res.status, res.statusText);
    }

    // if (res.headers.get('content-type') !== 'application/json') {
    //   return { items: [] };
    // }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { items: [] };
  }
}

export default async function BlogPage() {
  let data;
  try {
    data = await getData();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
  const items = data && data.items ? [...data.items] : [];
  return (
    <main>
      <h1>Hello World</h1>
      <p>Posts:</p>
      {items &&
        items.map((item, idx) => {
          return <BlogCard title={item.title} key={`post-${idx}`} />;
        })}
    </main>
  );
}
