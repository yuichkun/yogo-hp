import Image from "next/image";
import Link from "next/link";
import { getWorks } from "../lib/api";

export default async function Works() {
  const works = await getWorks();
  return (
    <main className="">
      <h1>Works</h1>
      <ul>
        {works.items.map((work) => {
          const {
            fields: { slug, title, thumbnail, year },
          } = work;
          return (
            <li key={work.sys.id} className="">
              <Link className="text-2xl font-bold" href={`works/${slug}`}>
                <span>
                  {title} ({year})
                </span>
                {thumbnail?.fields?.file ? (
                  <div className="w-96">
                    <Image
                      src={`https:${thumbnail.fields.file.url}`}
                      alt={title}
                      width={thumbnail.fields.file.details.image?.width ?? 100}
                      height={
                        thumbnail.fields.file.details.image?.height ?? 100
                      }
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
