"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
  url: string;
};

const Loading = () => (
  <div className="grid place-content-center w-full h-full bg-gray-300 bg-opacity-20">
    <span className="loading loading-ring loading-lg"></span>
  </div>
);

export function WorkImage({ title, url }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoad = () => setIsLoading(false);
  const cls = cn("h-full object-cover image", {
    clipped: isLoading,
    revealed: !isLoading,
  });
  return (
    <div className="w-full h-full relative">
      {isLoading && <Loading />}
      <Image src={url} alt={title} className={cls} fill onLoad={handleLoad} />
    </div>
  );
}
