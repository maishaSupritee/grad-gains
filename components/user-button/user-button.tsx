import { auth, signOut } from "@/auth";
import { type Session } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Avatar from "./avatar";

// pass an optional user, or let the component fetch the user
export default function UserButton({ session }: { session?: Session | null }) {
  return (
    <Suspense fallback={<Avatar />}>
      <UserButtonContent session={session} />
    </Suspense>
  );
}

async function UserButtonContent({ session }: { session?: Session | null }) {
  const user = session !== undefined ? session?.user : (await auth())?.user;

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full border-2 border-zinc-800 outline-none transition-all duration-300 hover:border-zinc-600 hover:shadow-lg hover:shadow-zinc-800/40 focus-visible:border-zinc-600 focus-visible:shadow-lg focus-visible:shadow-zinc-800/40 data-[state=open]:border-zinc-600 data-[state=open]:shadow-lg data-[state=open]:shadow-zinc-800/40 dark:border-zinc-800 dark:hover:border-zinc-900 dark:hover:shadow-zinc-800/40 dark:focus-visible:border-zinc-900 dark:data-[state=open]:border-zinc-900">
          <Avatar src={user.image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <Link href="/profile">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="w-full"
          >
            <DropdownMenuItem asChild className="cursor-pointer">
              <button className="w-full">Sign Out</button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
