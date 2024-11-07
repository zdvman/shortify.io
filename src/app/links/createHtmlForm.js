//app/links/createHtmlForm.js
"use client";

import { useState } from "react";

export default function LinksCreateHtmlForm({ didSubmit }) {
  const [url, setUrl] = useState("https://damaxtravel.com");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleForm = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    setResponse(null); // Reset the response state
    setError(null); // Reset the error state

    // Basic URL validation using the URL constructor in JavaScript
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
    // if the URL is invalid, set an error message and return
    try {
      new URL(url); // Attempt to create a URL object
    } catch (_) {
      setError(
        "Please enter a valid URL - including the protocol (e.g., https:// or http://), domain, and path."
      );
      return;
    }

    const JSONdata = JSON.stringify({ url }); // Convert the URL to JSON
    const endpoints = "/api/links"; // API endpoint to create a new link
    const options = {
      // Fetch options
      method: "POST", // HTTP POST method
      headers: {
        "Content-type": "application/json", // Set the content type
      },
      body: JSONdata, // Attach the request body
    };

    try {
      const res = await fetch(endpoints, options); // Fetch the API

      let data; // Response data
      try {
        data = await res.json(); // Parse the JSON response
      } catch (parseError) {
        // Catch any JSON parsing errors
        console.error("Failed to parse JSON:", parseError);
        data = null; // Set data to null if an error occurred
      }

      if (!res.ok) {
        // Handle errors if the response is not OK
        setError((data && data.error) || "An error occurred"); // Set the error message
        return;
      }

      // Successful response - set the response state
      setResponse(data);

      if (didSubmit) {
        // If a callback function is provided, call it
        didSubmit();
      }
    } catch (err) {
      // Catch any unexpected errors
      console.error("An unexpected error occurred:", err);
      setError(
        "Failed to create link. Please check your network connection and try again."
      );
    }
  };

  return (
    <>
      <h2>Create a new link</h2>
      <form onSubmit={handleForm}>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            // Update the URL state when the input value changes
            setUrl(e.target.value);
            setResponse(null);
            setError(null);
          }}
          name="url"
          placeholder="Your URL to shorten"
        />
        <button type="submit">Shorten</button>
      </form>
      {/* Display the error message if an error occurred */}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {/* Display the response */}
      {response && (
        <div style={{ color: "green" }}>
          Successfully created link: {JSON.stringify(response)}
        </div>
      )}
    </>
  );
}
