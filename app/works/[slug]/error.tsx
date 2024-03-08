"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>404: Work Not Found</h2>
      <Link href="/works">Back to Works</Link>
    </div>
  );
}
