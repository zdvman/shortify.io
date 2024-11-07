import { getLinks } from "@/app/lib/db";

export default async function LinksHTMLTable() {
  const linksResponse = await getLinks();

  return (
    <div>
      <table>
        <tbody>
          {linksResponse &&
            linksResponse.map((link, idx) => {
              return (
                <tr
                  key={`link-item-${link.id}-${idx}`}
                  /* 
                    Explanation of the key:

                    - <tr>: This is an HTML table row element, representing a single row in the table.

                    - key: A special React prop that uniquely identifies each <tr> in the list. 
                    React uses it for efficient updates and to track changes during re-renders.
                    If the key is missing or not unique, React will log a warning and may behave unpredictably.

                    - Template literal (key={`link-item-${link.id}-${idx}`}):
                    This dynamically generates a unique string for the key using the following:
                    1. 'link-item-': A fixed string prefix to provide context and make debugging easier.
                    2. ${link.id}: The unique ID of the current link object (assumed to be unique from the database).
                    3. ${idx}: The index of the current item in the array, used as a fallback to ensure uniqueness 
                      if link.id is not unique or undefined.

                    Example key:
                    If link.id = 101 and idx = 0, the key will be 'link-item-101-0'.
                  */
                >
                  {/* Displays the unique ID of the link */}
                  <td>{link.id}</td>
                  {/* Displays the URL of the link */}
                  <td>{link.url}</td>
                  {/* <td>{link.createdAt}</td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
