import { Button } from "@/components/ui/button";

export default function Signin() {
  type Provider = "discord" | "github";

  return (
    <form
      className="flex h-screen flex-col items-center justify-center gap-10"
      action={async (FormData) => {
        "use server";
        console.log(FormData);
      }}
    >
      <h1 className="text-6xl font-semibold">Grad Gains</h1>

      <div className="flex flex-col items-center gap-5">
        <Button type="submit" name="button" value="discord">
          Sign in with Discord
        </Button>

        <Button type="submit" name="button" value="github">
          Sign in with Github
        </Button>
      </div>
    </form>
  );
}
