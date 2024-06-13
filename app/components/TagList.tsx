"use client";

import { cn } from "@/utils/cn";
import { Tag as ITag } from "contentful";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
      <div className="capitalize border inline px-3 py-1 rounded-2xl text-xs">
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
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const selectedTagId = searchParams.get("tag");
  return (
    <ul className="flex gap-2 p-4 whitespace-nowrap overflow-x-auto">
      {allTags.map((tag) => {
        const params = new URLSearchParams();
        params.append("tag", tag.sys.id);
        const isSelected = selectedTagId === tag.sys.id;
        return (
          <li key={tag.sys.id}>
            <Tag
              name={tag.name}
              href={`${pathName}/?${params.toString()}`}
              isSelected={isSelected}
            />
          </li>
        );
      })}
    </ul>
  );
};
