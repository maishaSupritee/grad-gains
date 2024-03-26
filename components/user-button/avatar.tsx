import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "../skeleton";

export default function Avatar({ src, className }: { src?: string | null; className?: string }) {
  return src ? (
    <div className="h-fit w-fit select-none rounded-full">
      <Image
        priority
        src={src}
        alt="Avatar"
        className={cn("flex size-10 shrink-0 overflow-clip rounded-full", className)}
        width={40}
        height={40}
      />
    </div>
  ) : (
    <Skeleton className="h-11 w-11 rounded-full" />
  );
}
