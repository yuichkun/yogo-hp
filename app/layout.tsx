import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { FriendlyNotice } from "./FriendlyNotice";
import { Header } from "./Header";
import "./globals.css";
import { SHARED_METADATA } from "./shared-metadata";
import { Analytics } from "@vercel/analytics/react";

const DynamicBackground = dynamic(() => import("./components/Background"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...SHARED_METADATA,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      style={{
        background: "radial-gradient(#262282, #383486)",
      }}
    >
      <body className={cn(inter.className, "min-h-screen relative")}>
        <Header />
        <div className="p-4 mb-12">{children}</div>
        <div className="fixed bottom-0 hidden">
          <FriendlyNotice />
        </div>
        <DynamicBackground />
        <Analytics />
      </body>
    </html>
  );
}
