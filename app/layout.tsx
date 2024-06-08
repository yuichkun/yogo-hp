import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Header } from "./Header";
import { FriendlyNotice } from "./FriendlyNotice";
import { Background } from "./components/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yuichi Yogo",
  description: "Official website of Yuichi Yogo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const vertexShader = await fs.readFile(
    path.resolve("./public/vert.glsl"),
    "utf-8"
  );
  const fragmentShader = await fs.readFile(
    path.resolve("./public/frag.glsl"),
    "utf-8"
  );
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen relative")}>
        <Header />
        <div className="p-4 mb-12">{children}</div>
        <div className="fixed bottom-0 hidden">
          <FriendlyNotice />
        </div>
        <div className="w-screen h-screen fixed top-0 left-0 -z-10">
          <Background
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
          />
        </div>
      </body>
    </html>
  );
}
