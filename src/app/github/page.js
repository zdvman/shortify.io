'use client';

import useSWR from 'swr';

async function fetcher(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching Github profile:', error);
  }
}

export default function GithubProfile() {
  const myGithubRepoProfile = 'https://api.github.com/repos/zdvman/shortify.io';
  const { data, error, isLoading, isValidating } = useSWR(
    myGithubRepoProfile,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading || isValidating) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <strong>👁️ {data?.subscribers_count}</strong>{' '}
      <strong>⭐ {data?.stargazers_count}</strong>{' '}
      <strong>🍴 {data?.forks_count}</strong>
    </div>
  );
}
