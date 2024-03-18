import NextAuth, { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

const config = {
  providers: [Discord, Google],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
