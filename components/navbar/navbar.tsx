import { auth } from "@/auth";
import { type Session } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";
import UserButton from "../user-button/user-button";
import AuthLinks from "./auth-links";
import MenuToggle from "./menu-toggle";
import NavLinks from "./nav-links";

/*
  if isPrivate is passed, that means we already know the auth state and just want to render the navbar content.
  if isPrivate is not passed, that means we don't know the auth state so we need to fetch it. (for cases like contact page)
*/
export default function Navbar({
  isPrivate,
  forceSkeleton,
}: {
  isPrivate?: boolean;
  forceSkeleton?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute left-0 top-0 w-full transition-all duration-150">
        {forceSkeleton ? (
          <NavbarSkeleton />
        ) : isPrivate !== undefined ? (
          <NavbarContent isPrivate={isPrivate} />
        ) : (
          <Suspense fallback={<NavbarSkeleton />}>
            <NavbarProvider />
          </Suspense>
        )}
      </div>
    </header>
  );
}

async function NavbarProvider() {
  const session = await auth();
  return <NavbarContent isPrivate={!!session} session={session} />;
}

function NavbarContent({ isPrivate, session }: { isPrivate: boolean; session?: Session | null }) {
  return (
    <>
      <div className="flex h-20 w-full items-center justify-between px-8 backdrop-blur-xl maxMd:[:has(#menuToggle:checked)_&]:bg-zinc-950">
        <div className="flex w-[250px]">
          <Link
            href={isPrivate ? "/dashboard" : "/"}
            className="flex items-center justify-center gap-2 rounded-md outline-none transition-all duration-150 ease-linear focus-visible:ring-2"
          >
            <p className="text-3xl font-medium tracking-tight">Grad Gains</p>
          </Link>
        </div>
        <ul className="hidden items-center gap-8 transition-all duration-150 md:flex">
          <NavLinks isPrivate={isPrivate} className="rounded-md" />
        </ul>
        <div className="hidden w-[250px] justify-end gap-4 md:flex">
          {isPrivate ? <UserButton session={session} /> : <AuthLinks />}
        </div>
        <div className="flex md:hidden">
          <MenuToggle />
        </div>
      </div>
      <ul className="maxMd:[:has(#menuToggle:checked)_&]/10 hidden bg-zinc-950 px-8 pb-8 maxMd:[:has(#menuToggle:checked)_&]:flex maxMd:[:has(#menuToggle:checked)_&]:flex-col maxMd:[:has(#menuToggle:checked)_&]:gap-4 maxMd:[:has(#menuToggle:checked)_&]:shadow-xl">
        <div className="divide-y">
          <NavLinks isPrivate={isPrivate} className="flex py-4" />
        </div>
        {isPrivate ? (
          <div>
            <UserButton session={session} />
          </div>
        ) : (
          <div className="flex gap-4">
            <AuthLinks className="w-full" />
          </div>
        )}
      </ul>
    </>
  );
}

function NavbarSkeleton() {
  return (
    <>
      <div className="flex h-20 w-full items-center justify-between px-8 backdrop-blur-xl maxMd:[:has(#menuToggle:checked)_&]:bg-zinc-950">
        <div className="flex w-[250px]">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-md outline-none transition-all duration-150 ease-linear focus-visible:ring-2"
          >
            <p className="text-3xl font-medium tracking-tight">Grad Gains</p>
          </Link>
        </div>
        <ul className="hidden items-center gap-8 transition-all duration-150 md:flex">
          <NavLinks className="rounded-md" isPrivate />
        </ul>
        <div className="hidden w-[250px] justify-end gap-4 md:flex" />
        <div className="flex md:hidden">
          <MenuToggle />
        </div>
      </div>
      <ul className="maxMd:[:has(#menuToggle:checked)_&]/10 hidden bg-zinc-950 px-8 pb-8 maxMd:[:has(#menuToggle:checked)_&]:flex maxMd:[:has(#menuToggle:checked)_&]:flex-col maxMd:[:has(#menuToggle:checked)_&]:gap-4 maxMd:[:has(#menuToggle:checked)_&]:shadow-xl">
        <div className="divide-y">
          <NavLinks className="flex py-4" isPrivate />
        </div>
      </ul>
    </>
  );
}
