"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

const LINKS = [
  { href: "/works", label: "Works" },
  { href: "/bio", label: "Bio" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const input = useRef<HTMLInputElement>(null);
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
            "text-2xl ml-4 tracking-wider font-bold hover:bg-black px-2",
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
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    className={cn("hover:bg-black px-2 uppercase", {
                      ["text-primary focus:text-primary"]: pathname.startsWith(
                        `${href}`
                      ),
                    })}
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
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
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => {
                  if (input.current) {
                    input.current.checked = false;
                  }
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

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
