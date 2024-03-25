import { ModeToggle } from "@/components/ui/toggle-mode";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ModeToggle />
      <div className="flex h-screen flex-col items-center justify-center gap-5">
        <h1 className="text-6xl font-semibold">Grad Gains</h1>
        <Link href={"/sign-in"} className="text-2xl">
          Sign In
        </Link>
      </div>
    </>
  );
}
