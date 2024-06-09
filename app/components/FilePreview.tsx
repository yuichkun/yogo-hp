"use client";

type Props = {
  url: string;
  title: string;
};
export function FilePreview({ url, title }: Props) {
  return (
    <a href={url} target="__blank">
      {title}
    </a>
  );
}
