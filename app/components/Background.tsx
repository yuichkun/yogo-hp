"use client";
import { cn } from "@/utils/cn";
import Spline from "@splinetool/react-spline/next";
import { usePathname } from "next/navigation";

export function Background() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <div
      className={cn(
        "w-screen h-screen fixed top-0 left-0 -z-10 transition-opacity",
        {
          "opacity-20": !isHome,
        }
      )}
    >
      <Spline scene="https://prod.spline.design/PiZdRPRPqT6MNYsC/scene.splinecode" />
    </div>
  );
}
