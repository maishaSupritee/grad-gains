"use client"

import React, { useState } from "react";
// import { NavigationMenuDemo } from "./components/navigation";
import { WavyBackground } from "./components/ui/wavy-background";
import { Menu, MenuItem }  from "./components/ui/navbar-menu";
import { cn } from "@/utils/cn";


// <NavigationMenuDemo />
const Page = () => {
  return (
    <div className="bg-black">
      <WavyBackground className="max-w-4xl mx-auto pb-40">
      <Navbar className="top-2" />
      <div className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
              <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-red-300  text-center font-sans font-bold">
                Welcome to GradGains
              </h1>
              <p></p>
              <p className="text-white font-semibold max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                Together we invest, Together we rise <br/>
                Your All-in-one Investment Platform to Save, Invest and Build Your Financial Community.
              </p>
        </div>
    </div>
    </WavyBackground>
    </div>

  )
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Our Team"/>
        <MenuItem setActive={setActive} active={active} item="Contact Us"/>
        <MenuItem setActive={setActive} active={active} item="Login"/>
        <MenuItem setActive={setActive} active={active} item="Open an account"/>
      </Menu>
    </div>
  );
}
export default Page;
