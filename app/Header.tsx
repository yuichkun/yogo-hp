"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

type NavLink =
  | { href: string; label: string; external?: false }
  | { href: string; label: string; external: true };

const LINKS: NavLink[] = [
  { href: "/works", label: "Music" },
  {
    href: "https://yogo-creative-coding.vercel.app/",
    label: "Coding",
    external: true,
  },
  { href: "/bio", label: "Bio" },
  { href: "/activities", label: "Activities" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const input = useRef<HTMLInputElement>(null);

  const closeDrawer = () => {
    if (input.current) {
      input.current.checked = false;
    }
  };

  return (
    <div className="drawer z-50">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        ref={input}
      />
      <div className="drawer-content w-full flex justify-between items-center">
        <Link
          href="/"
          className={cn(
            "text-2xl ml-4 tracking-wider font-bold hover:bg-black px-2 no-underline",
            {
              ["text-primary"]: pathname === "/",
            }
          )}
        >
          YOGO
        </Link>
        <nav className="w-full navbar flex justify-end gap-4">
          <div className="flex-none hidden lg:block">
            <ul className="flex gap-8 font-bold">
              {LINKS.map((link) => {
                const isExternal = link.external === true;
                const isActive = !isExternal && pathname.startsWith(link.href);
                const className = cn(
                  "hover:bg-black px-2 uppercase no-underline inline-flex items-center gap-1",
                  {
                    ["text-primary focus:text-primary"]: isActive,
                  }
                );
                return (
                  <li key={link.href}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                        title="外部サイト（新しいタブで開きます）"
                      >
                        {link.label}
                        <ExternalLinkIcon />
                        <span className="sr-only">（新しいタブで開く）</span>
                      </a>
                    ) : (
                      <Link className={className} href={link.href}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <Hamburger />
            </label>
          </div>
        </nav>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="p-4 w-80 min-h-full font-bold bg-black bg-opacity-70 flex flex-col gap-6 text-center pt-16 uppercase">
          {LINKS.map((link) => {
            const isExternal = link.external === true;
            return (
              <li key={link.href}>
                {isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline inline-flex items-center justify-center gap-1"
                    title="外部サイト（新しいタブで開きます）"
                    onClick={closeDrawer}
                  >
                    {link.label}
                    <ExternalLinkIcon />
                    <span className="sr-only">（新しいタブで開く）</span>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="no-underline"
                    onClick={closeDrawer}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block w-3 h-3 shrink-0 opacity-80"
    aria-hidden
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block w-5 h-5 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    ></path>
  </svg>
);
