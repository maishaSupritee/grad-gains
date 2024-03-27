"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = { href: string; label: string };

const publicPages: Page[] = [];
// Update private pages accordingly
const privatePages: Page[] = [
  { href: "/friends", label: "Friends" },
  { href: "/savings", label: "Savings" },
  { href: "/investments", label: "Investments" },
];

export default function NavLinks({
  isPrivate,
  className,
}: {
  isPrivate?: boolean;
  className?: string;
}) {
  const pages = isPrivate ? privatePages : publicPages;
  const pathname = usePathname();

  return (
    <>
      {pages.map(({ href, label }) => (
        <li key={label}>
          <Link
            href={href}
            className={cn(
              `text-lg font-medium outline-none transition-all duration-300 ease-in-out focus-visible:ring-2 ${
                pathname?.startsWith(href)
                  ? "text-slate-100"
                  : "text-slate-400 hover:text-slate-100"
              }`,
              className
            )}
          >
            {label}
          </Link>
        </li>
      ))}
    </>
  );
}
