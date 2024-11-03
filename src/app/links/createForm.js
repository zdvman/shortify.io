'use client';

import { useState } from 'react';

export default function LinksCreateForm() {
  const [results, setResult] = useState(null);
  const handleForm = async (event) => {
    event.preventDefault();

    // create a new FormData object from the form
    // event.target is the form element
    const formData = new FormData(event.target);
    // create an object from the form data
    // Object.fromEntries converts key-value pairs to an object
    // it requires an iterable object, like formData
    const data = Object.fromEntries(formData);
    // console.log(data);
    // convert the object to a JSON string
    // for sending to the server
    const JSONdata = JSON.stringify(data);
    // console.log(JSONdata);

    const endpoints = '/api/links';
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSONdata,
    };
    const response = await fetch(endpoints, options);
    if (!response.ok) {
      throw new Error('Failed to create link');
    }
    const result = await response.json();
    setResult(result);
    // console.log(result);
    return result;
  };
  return (
    <>
      <form onSubmit={handleForm}>
        <input
          type='text'
          defaultValue='https://shortify-krv4dtajx-zdvmans-projects.vercel.app/github'
          name='url'
          placeholder='Your url to shorten'
        />
        <button type='submit'>Shorten</button>
      </form>
      {results && JSON.stringify(results)}
    </>
  );
}
