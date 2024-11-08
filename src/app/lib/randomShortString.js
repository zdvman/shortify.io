export default function randomShortString() {
  // This function generates a random string of 5 characters
  // It uses Math.random() to generate a random number
  // Then converts it to base 36 (a-z, 0-9) and takes a substring
  // This results in a string like '0.1234567890'
  // The substring function removes the '0.' and takes the first 5 characters
  // This ensures the string is always 5 characters long
  const result = Math.random().toString(36).substring(2, 7);
  return result;
}
