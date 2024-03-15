import { auth } from "auth";

export default async function Dashboard() {
  const session = await auth();

  if (session && session.user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-semibold">Welcome to Grad Gains {session.user.name}</h1>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-6xl font-semibold">Grad Gains Dashboard</h1>
      </div>
    );
  }
}
