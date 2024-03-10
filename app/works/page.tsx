import Image from "next/image";
import Link from "next/link";
import { getWorks } from "../lib/api";

export default async function Works() {
  const works = await getWorks();
  const IMAGE_SCALE = 0.5;
  return (
    <main className="">
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
                  <div className="w-full h-full">
                    <Image
                      src={`https:${thumbnail.fields.file.url}`}
                      alt={title}
                      width={1920 * IMAGE_SCALE}
                      height={1080 * IMAGE_SCALE}
                      className="h-full object-cover"
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
