"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/moving-border";
import appLogo from "@/public/images/gradgains-logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BackgroundWithButtons() {
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
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <Image src={appLogo as string} alt="Logo" width={200} height={200}></Image>
        <div className="text-center text-6xl font-bold dark:text-white md:text-7xl">
          Welcome To GradGains
        </div>
        <div className="py-4 text-center text-2xl font-light dark:text-neutral-200 md:text-4xl">
          Save, Invest and Grow with your University
        </div>
        <Button
          borderRadius="1.75rem"
          className="border-neutral-200 bg-green-500 font-semibold text-black hover:text-white dark:border-slate-800"
        >
          <span>
            <Link href={"/sign-in"}>Sign In</Link>
          </span>
        </Button>
      </motion.div>
    </AuroraBackground>
  );
}
