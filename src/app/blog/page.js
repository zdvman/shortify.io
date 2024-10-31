// src/app/blog/page.js

import getDomain from '@/app/lib/getDomain';

// fetch caching options

// force-cache

// revalidate: n seconds
// no-store

async function getData() {
  // 1. API endpoints
  const domain = getDomain();
  const endpoint = `${domain}/api/posts`;
  console.log(`Fetching data from ${endpoint}`);

  try {
    const res = await fetch(endpoint, { next: { revalidate: 10 } });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      throw new Error('Failed to fetch data!');
    }

    if (res.headers.get('content-type') !== 'application/json') {
      console.warn('Response is not JSON');
      return { items: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default async function BlogPage() {
  try {
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
  } catch (error) {
    console.error('Error in BlogPage:', error);
    // Handle the error appropriately
  }
}
