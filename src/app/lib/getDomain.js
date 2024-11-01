// src/app/lib/getDomain.js

export default function getDomain() {
  console.log('NEXT_PUBLIC_VERCEL_ENV:', process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log('NEXT_PUBLIC_VERCEL_URL:', process.env.NEXT_PUBLIC_VERCEL_URL);
  const protocol =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https' : 'http';
  const domain = process.env.NEXT_PUBLIC_VERCEL_URL
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : 'localhost:3000';
  console.log(`Current API url: ${protocol}://${domain}`);
  return `${protocol}://${domain}`;
}
