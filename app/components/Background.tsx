"use client";
import { cn } from "@/utils/cn";
import Spline from "@splinetool/react-spline/next";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Background() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div
      className={cn(
        "w-screen h-screen fixed top-0 left-0 -z-10 transition-opacity",
        {
          "opacity-20": !isHome,
        }
      )}
    >
      {isLoading && <Loading />}
      <Spline
        scene="https://prod.spline.design/PiZdRPRPqT6MNYsC/scene.splinecode"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

const Loading = () => (
  <div className="fixed grid place-content-center w-screen h-screen bg-gray-300 bg-opacity-20">
    <span className="loading loading-ring loading-lg"></span>
  </div>
);
