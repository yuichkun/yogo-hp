import Image from "next/image";
import Link from "next/link";
import { getWorks } from "../lib/api";

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
      <ul className="flex flex-wrap gap-8 justify-center">
        {works.items.map((work) => {
          const {
            fields: { slug, title, thumbnail, year },
          } = work;
          return (
            <li
              key={work.sys.id}
              className="basis-[640px] h-[360px] p-4 overflow-hidden"
            >
              <Link className="text-2xl font-bold" href={`works/${slug}`}>
                <div className="mb-4">
                  {title} ({year})
                </div>
                {thumbnail?.fields?.file ? (
                  <div className="w-full h-full relative">
                    <Image
                      src={`https:${thumbnail.fields.file.url}`}
                      alt={title}
                      className="h-full object-cover"
                      fill
                    />
                  </div>
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
