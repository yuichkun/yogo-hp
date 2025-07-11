import { Metadata } from "next";
import { TagList, FilterItem } from "../components/TagList";
import { WorkList } from "../components/WorkList";
import { getAllTags, getWorks } from "../lib/api";
import { SHARED_METADATA } from "../shared-metadata";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Works() {
  const allTags = await getAllTags();
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
      <div className="mb-8 w-full md:w-[640px] mx-auto">
        <Suspense>
          <TagList
            items={allTags.map((tag) => ({
              id: tag.sys.id,
              name: tag.name,
            }))}
            baseUrl="/works"
          />
        </Suspense>
      </div>
      <Suspense>
        <WorkList works={works} allTags={allTags} />
      </Suspense>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Works",
  description: "List of works by Yuichi Yogo",
  twitter: {
    ...SHARED_METADATA.twitter,
    title: `YOGO HP | Works`,
    description: "List of works by Yuichi Yogo",
  },
};
