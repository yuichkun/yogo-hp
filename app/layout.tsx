import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Header } from "./Header";

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
      <body className={inter.className}>
        <Header />
        <div className="p-4">{children}</div>
      </body>
    </html>
  );
}
