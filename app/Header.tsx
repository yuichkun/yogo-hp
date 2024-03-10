"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/works", label: "Works" },
  { href: "/bio", label: "Bio" },
  // { href: "/research", label: "Research" },
  // { href: "/activities", label: "Activities" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const pathname = usePathname();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full flex justify-between items-center">
        <Link
          href="/"
          className={cn("text-2xl ml-4 tracking-wider font-bold", {
            ["text-primary"]: pathname === "/",
          })}
        >
          YOGO
        </Link>
        <nav className="w-full navbar bg-base-100 flex justify-end gap-4">
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    className={cn({
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
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
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
