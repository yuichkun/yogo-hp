import Link from "next/link";
import { getNews } from "./lib/api";

export default async function Home() {
  const news = await getNews();
  return (
    <main className="p-8 font-mono max-w-96 mx-auto">
      <div className="flex justify-center">
        <span className="bg-black mb-8">What&apos;s New?</span>
      </div>

      <ul>
        {news.items.map(({ fields: { title, slug, date } }) => {
          const parsedDate = new Date(date);
          const formattedDate = `${parsedDate.getFullYear()}/${parsedDate.getMonth() + 1}/${parsedDate.getDate()}`;
          return (
            <li key={slug}>
              <Link
                href={`/news/${slug}`}
                className="grid grid-cols-2 text-sm bg-gray-200 text-black mix-blend-overlay"
                style={{
                  gridTemplateColumns: "120px auto",
                }}
              >
                <div className="">{formattedDate}</div>
                <div className="text-sm underline">{title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
