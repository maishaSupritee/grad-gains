import { NavBar } from "@/components/NavBar";

export default function () {
  return (
    <div className="flex flex-col gap-10">
      <NavBar />
      <div className="flex h-screen flex-col items-center justify-center gap-5">
        <h1 className="text-6xl font-semibold">Grad Gains Investments Page</h1>
      </div>
    </div>
  );
}
