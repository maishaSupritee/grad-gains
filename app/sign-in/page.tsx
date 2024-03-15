import { Button } from "@/components/ui/button";
import discordLogo from "@/public/images/discord-logo.svg";
import { signIn } from "auth";

export default function SigninPage() {
  type Provider = "discord" | "github";
  async function handleSignin(formData: FormData) {
    "use server";
    const provider: Provider = formData.get("provider") as Provider;
    await signIn(provider);
  }

  return (
    <form
      className="flex h-screen flex-col items-center justify-center gap-10"
      action={handleSignin}
    >
      <h1 className="text-6xl font-semibold">Grad Gains</h1>

      <Button type="submit" name="provider" value="discord" icon={discordLogo} size="lg">
        Sign in with Discord
      </Button>
    </form>
  );
}
