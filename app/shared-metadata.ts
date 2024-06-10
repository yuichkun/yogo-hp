import { Metadata } from "next";

export const SHARED_METADATA: Metadata = {
  title: {
    template: "YOGO HP | %s",
    default: "YOGO HP",
  },
  description: "The Official Website of Yuichi Yogo",
  generator: "Next.js",
  applicationName: "YOGO HP",
  keywords: [
    "Yuichi Yogo",
    "Yogo Yuichi",
    "Yogo Management Office",
    "YOGO",
    "余湖",
    "余湖雄一",
    "よご",
    "よごゆういち",
  ],
  authors: [
    {
      name: "Yuichi Yogo",
      url: "https://yogo.style",
    },
  ],
  creator: "Yuichi Yogo",
  publisher: "Yogo Management Office, LLC",
  openGraph: {
    url: "https://yogo.style",
    siteName: "YOGO HP",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://yogo.style",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOGO HP",
    description: "The Official Website of Yuichi Yogo",
  },
};
