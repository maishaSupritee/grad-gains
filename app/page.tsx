"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/moving-border";

export function BackgroundWithButtons() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-6xl md:text-7xl font-bold dark:text-white text-center">
          Welcome To GradGains
        </div>
        <div className="font-light text-2xl md:text-4xl dark:text-neutral-200 py-4 text-center">
          Save, Invest and Grow with your University
        </div>
        <Button
          borderRadius="1.75rem"
          className="bg-green-500 text-black hover:text-white border-neutral-200 dark:border-slate-800 font-semibold"
        >
          <span><Link href={"/sign-in"}>Sign In</Link></span>
        </Button>
      </motion.div>
    </AuroraBackground>
  );
}
export default function Home() {
  return (
    <div className="flex flex-col justify-center align-middle">
      <BackgroundWithButtons />
    </div>
  );
}
