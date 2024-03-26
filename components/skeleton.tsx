import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-skeleton rounded-md bg-[linear-gradient(270deg,#111,#333,#333,#111)] bg-[length:400%_100%]",
        className
      )}
      {...props}
    />
  );
}
