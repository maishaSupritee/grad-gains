import { Button } from "@/components/ui/button";
import { Provider } from "@/lib/types";
import discordLogo from "@/public/images/discord-logo.svg";
import googleLogo from "@/public/images/google-logo.svg";
import { signIn } from "auth";

export default function SigninPage() {
  return (
    <>
      <form
        className="flex h-screen flex-col items-center justify-center gap-10"
        action={async (formData: FormData) => {
          "use server";
          const provider = formData.get("provider") as Provider;
          console.log(provider); //keep for testing
          await signIn(provider, { redirectTo: "/dashboard" });
        }}
      >
        <h1 className="text-6xl font-semibold">Grad Gains</h1>
        <div className="flex flex-col items-center gap-5">
          <Button
            variant="secondary"
            type="submit"
            name="provider"
            value="discord"
            icon={discordLogo}
            size="lg"
          >
            Sign in with Discord
          </Button>
          <Button
            variant="secondary"
            type="submit"
            name="provider"
            value="google"
            icon={googleLogo}
            size="lg"
          >
            Sign in with Google
          </Button>
        </div>
      </form>
    </>
  );
}
