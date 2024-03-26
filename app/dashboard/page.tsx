import { auth } from "auth";

export default async function Dashboard() {
  const session = await auth();
  console.log(session); //keep it to see if we are getting user data correctly or not

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold">Welcome to Grad Gains</h1>
      {session?.user && (
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-4xl font-semibold">{session.user.name}</h1>
        </div>
      )}
    </div>
  );
}
