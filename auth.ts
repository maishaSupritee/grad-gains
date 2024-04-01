import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

const config = {
  adapter: DrizzleAdapter(db),
  providers: [Discord, Google],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
