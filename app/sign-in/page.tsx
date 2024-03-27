import { DiscordIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { type Provider } from "@/lib/types";
import { signIn } from "auth";

export default function SigninPage() {
  return (
    <>
      <form
        className="flex h-screen flex-col items-center justify-center gap-10"
        action={async (formData) => {
          "use server";
          const provider = formData.get("provider") as Provider;
          console.log(provider); //keep for testing
          await signIn(provider, { redirectTo: "/dashboard" });
        }}
      >
        <h1 className="text-6xl font-semibold">Sign in to Grad Gains</h1>
        <div className="flex flex-col items-center gap-5">
          <Button
            variant="secondary"
            type="submit"
            name="provider"
            value="discord"
            className="flex items-center gap-4 px-6 py-8 text-xl font-semibold"
          >
            <DiscordIcon className="size-8" />
            Sign in with Discord
          </Button>
          <Button
            variant="secondary"
            type="submit"
            name="provider"
            value="google"
            className="flex items-center gap-4 px-6 py-8 text-xl font-semibold"
          >
            <GoogleIcon className="size-8" />
            Sign in with Google
          </Button>
        </div>
      </form>
    </>
  );
}
