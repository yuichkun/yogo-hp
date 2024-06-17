import { Metadata } from "next";
import { SHARED_METADATA } from "../shared-metadata";

export default function Contact() {
  return (
    <main>
      <div>
        <div className="mb-2">▶︎各種SNS等</div>
        <a href="https://bento.me/yuichkun" target="_blank">
          bento
        </a>
      </div>
      <p className="mt-8">
        お仕事関係のご相談/お問い合わせは、
        <a
          href="https://yogo-management-office.com/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          会社HP
        </a>
        よりお願いします。
      </p>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information of Yuichi Yogo",
  twitter: {
    ...SHARED_METADATA.twitter,
    title: `YOGO HP | Contact`,
    description: "Contact information of Yuichi Yogo",
  },
};
