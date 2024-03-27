import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function AuthLinks({ className }: { className?: string }) {
  return (
    <Link
      href="/sign-in"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "bg-zinc-950/30 py-5 text-lg font-semibold",
        className
      )}
    >
      Sign In
    </Link>
  );
}
