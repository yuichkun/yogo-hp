import Link from "next/link";
import { getWorks } from "../lib/api";
import { WorkImage } from "../components/WorkImage";
import { Metadata } from "next";

export default async function Works() {
  const works = await getWorks();
  const oldestWorkYear = works.items.reduce(
    (acc, work) => Math.min(acc, work.fields.year),
    Infinity
  );
  const newestWorkYear = works.items.reduce(
    (acc, work) => Math.max(acc, work.fields.year),
    -Infinity
  );
  return (
    <main className="">
      <div className="text-center mb-4">
        Works by Yuichi Yogo <br />
        {oldestWorkYear} - {newestWorkYear}
      </div>
      <ul className="flex flex-wrap gap-4 lg:gap-16 justify-center">
        {works.items.map((work) => {
          const {
            fields: { slug, title, thumbnail, year },
          } = work;
          return (
            <li key={work.sys.id} className="basis-[640px] p-4">
              <Link href={`works/${slug}`} className="no-underline">
                <div className="mb-4">
                  <span className="font-bold text-2xl">{title}</span>{" "}
                  <span className="text-xl">({year})</span>
                </div>
                {thumbnail?.fields?.file ? (
                  <WorkImage
                    url={`https:${thumbnail.fields.file.url}?w=640&h=360&fit=fill&f=center&fm=webp`}
                    title={title}
                  />
                ) : (
                  <div>no image</div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Works",
  description: "List of works by Yuichi Yogo",
};
