"use client";
import Link from "next/link";
import { Works } from "../lib/api";
import { Tag as ITag } from "contentful";
import { Tag } from "./TagList";
import { WorkImage } from "./WorkImage";
import { useSelectedTag } from "../hooks/useSelectedTag";

export function WorkList({
  works,
  allTags,
}: {
  works: Works;
  allTags: ITag[];
}) {
  const selectedTagId = useSelectedTag();
  const filteredWorks = works.items.filter((work) => {
    if (selectedTagId === null) return true;
    return work.metadata.tags.some((tag) => tag.sys.id === selectedTagId);
  });
  return (
    <ul className="flex flex-wrap gap-4 lg:gap-16 justify-center">
      {filteredWorks.map((work) => {
        const {
          fields: { slug, title, thumbnail, year },
          metadata: { tags },
        } = work;
        return (
          <li
            key={work.sys.id}
            className="basis-[640px] p-4 hover:scale-105 transition-transform"
          >
            <Link href={`works/${slug}`} className="no-underline">
              <div className="mb-2">
                <span className="font-bold text-2xl">{title}</span>{" "}
                <span className="text-xl">({year})</span>
              </div>
              <div className="mb-2">
                <ul className="flex gap-2">
                  {tags.map((tag) => {
                    const foundTag = allTags.find(
                      (t) => t.sys.id === tag.sys.id
                    );
                    if (!foundTag) return null;
                    return (
                      <li key={tag.sys.id}>
                        <Tag name={foundTag.name} />
                      </li>
                    );
                  })}
                </ul>
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
  );
}
