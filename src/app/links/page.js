// This is the page file for the links page

import LinksCreateHtmlForm from "./createHtmlForm";
import LinksHTMLTable from "./table";

export default function LinksPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <h1>Shortify.io is coming soon 🚧</h1> */}
        {/* <LinksCreateHtmlForm /> */}
        <LinksHTMLTable />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
