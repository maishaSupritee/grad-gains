import { Button } from "@/components/ui/button";
export default function Signup() {
  type Provider = "discord" | "github";
  return (
    <>
      <form
        className="flex h-screen flex-col items-center justify-center"
        action={async (FormData) => {
          "use server";
          console.log(FormData);
        }}
      >
        <div className="flex items-center justify-center">
          <h1 className="text-6xl font-semibold">Grad Gains</h1>
        </div>
        <div className="mt-10 flex flex-col items-center">
          <Button type="submit" name="button" value="discord">
            Sign up with Discord
          </Button>
          <div className="mt-5 flex items-center">
            <Button type="submit" name="button" value="github">
              Sign up with Github
            </Button>
          </div>
        </div>
        <h2 className="mt-10">
          If you already have an account,
          <Button variant="link" type="submit" name="button" value="login" className="text-sky-500">
            Log In
          </Button>
        </h2>
      </form>
    </>
  );
}
