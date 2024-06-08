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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen relative")}>
        <Header />
        <div className="p-4 mb-12">{children}</div>
        <div className="fixed bottom-0 hidden">
          <FriendlyNotice />
        </div>
        <div className="w-screen h-screen fixed top-0 left-0 -z-10">
          <Background />
        </div>
      </body>
    </html>
  );
}
