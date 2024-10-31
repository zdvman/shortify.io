// src/app/blog/page.js

import getDomain from '@/app/lib/getDomain';

// fetch caching options

// force-cache

// revalidate: n seconds
// no-store

// src/app/blog/page.js

async function getData() {
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
  let items = [];

  try {
    const data = await getData();
    items = data.items || [];
  } catch (error) {
    console.error('Error in BlogPage:', error);
  }

  return (
    <main>
      <h1>Hello World</h1>
      <p>Posts:</p>
      {items.length > 0 ? (
        items.map((item, idx) => <li key={`post-${idx}`}>{item.title}</li>)
      ) : (
        <p>No posts available.</p>
      )}
    </main>
  );
}
