import Image from "next/image";
import Link from "next/link";
import { getWorks } from "../lib/api";
import { WorkImage } from "../components/WorkImage";

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
      <ul className="flex flex-wrap gap-16 justify-center">
        {works.items.map((work) => {
          const {
            fields: { slug, title, thumbnail, year },
          } = work;
          return (
            <li key={work.sys.id} className="basis-[640px] h-[360px] p-4">
              <Link href={`works/${slug}`}>
                <div className="mb-4 whitespace-nowrap">
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
