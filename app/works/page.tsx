import Link from "next/link";
import { getWorks } from "../lib/api";

export default async function Home() {
  const works = await getWorks();
  return (
    <main className="">
      <h1>Works</h1>
      <ul>
        {works.items.map((work) => (
          <li key={work.sys.id} className="">
            <Link
              className="text-2xl font-bold"
              href={`works/${work.fields.slug}`}
            >
              {work.fields.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
