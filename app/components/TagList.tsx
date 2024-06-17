"use client";

import { cn } from "@/utils/cn";
import { Tag as ITag } from "contentful";
import Link from "next/link";
import { useSelectedTag } from "../hooks/useSelectedTag";

export const Tag = ({
  name,
  href,
  isSelected,
}: {
  name: string;
  href?: string;
  isSelected?: boolean;
}) => {
  if (!href) {
    return (
      <div className="capitalize border inline px-3 py-1 rounded-2xl text-xs whitespace-nowrap">
        {name}
      </div>
    );
  }
  return (
    <Link
      className={cn(
        "capitalize border rounded-2xl inline px-4 py-2 no-underline text-sm",
        {
          "bg-gray-200 text-primary-content": isSelected,
        }
      )}
      href={href}
    >
      {name}
    </Link>
  );
};

export const TagList = ({ allTags }: { allTags: ITag[] }) => {
  const selectedTagId = useSelectedTag();
  return (
    <ul className="flex gap-2 p-4 whitespace-nowrap overflow-x-auto">
      <li key="all-works">
        <Tag name="ALL" href="/works" isSelected={selectedTagId === null} />
      </li>
      {allTags.map((tag) => {
        const params = new URLSearchParams();
        params.append("tag", tag.sys.id);
        const isSelected = selectedTagId === tag.sys.id;
        return (
          <li key={tag.sys.id}>
            <Tag
              name={tag.name}
              href={`/works/?${params.toString()}`}
              isSelected={isSelected}
            />
          </li>
        );
      })}
    </ul>
  );
};
