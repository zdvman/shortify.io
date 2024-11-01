'use client';

import { useState } from 'react';

export default function Card({ title }) {
  const [count, setCount] = useState(1);
  const handleClick = (event) => {
    event.preventDefault();
    setCount(count + 1);
  };
  if (!title) {
    return <div>Missing title</div>;
  }
  return (
    <div>
      <h1 onClick={handleClick}>{title}</h1>
      {count}
    </div>
  );
}
