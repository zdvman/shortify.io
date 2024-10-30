'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.log('This is error message: ', error.message);
  }, [error]);

  const retryRequestHandler = () => {
    reset();
  };
  return (
    <div>
      <h1>Something went wrong on purpose: {error.message} 😒!</h1>
      <button onClick={retryRequestHandler}>Retry request</button>
    </div>
  );
}
