"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

// Generic filter item type
export type FilterItem = {
  id: string;
  name: string;
  displayName?: string; // Optional display name different from id
};

// Generic TagList props
type TagListProps = {
  items: FilterItem[];
  baseUrl: string;
  paramName?: string; // Default to 'tag'
  allLabel?: string; // Default to 'ALL'
};

export const TagList = ({
  items,
  baseUrl,
  paramName = "tag",
  allLabel = "ALL",
}: TagListProps) => {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get(paramName);

  return (
    <ul className="flex gap-2 p-4 whitespace-nowrap overflow-x-auto">
      <li key="all-items">
        <Tag name={allLabel} href={baseUrl} isSelected={selectedId === null} />
      </li>
      {items.map((item) => {
        const params = new URLSearchParams();
        params.append(paramName, item.id);
        const isSelected = selectedId === item.id;
        return (
          <li key={item.id}>
            <Tag
              name={item.displayName || item.name}
              href={`${baseUrl}?${params.toString()}`}
              isSelected={isSelected}
            />
          </li>
        );
      })}
    </ul>
  );
};
