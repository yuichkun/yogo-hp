import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { FriendlyNotice } from "./FriendlyNotice";
import { Header } from "./Header";
import "./globals.css";

const DynamicBackground = dynamic(() => import("./components/Background"), {
  ssr: false,
});

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
    <html lang="ja">
      <body className={cn(inter.className, "min-h-screen relative")}>
        <Header />
        <div className="p-4 mb-12">{children}</div>
        <div className="fixed bottom-0 hidden">
          <FriendlyNotice />
        </div>
        <DynamicBackground />
      </body>
    </html>
  );
}
