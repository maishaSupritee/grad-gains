import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "auth";

export default async function Dashboard() {
  const session = await auth();
  console.log(session); //keep it to see if we are getting user data correctly or not

  return (
    <div className="flex flex-col gap-10">
      <NavBar />
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">Welcome to Grad Gains</h1>

        <div>
          {session && session.user ? (
            <div className="flex flex-col items-center justify-center gap-5">
              <h1 className="text-4xl font-semibold">{session.user.name}</h1>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/sign-in" });
                }}
              >
                <Button type="submit" variant={"destructive"}>
                  Sign Out
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
