import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Discord],
  callbacks: {
    async signIn({ user }) {
      // Redirect to dashboard after successful sign-in
      return "/dashboard";
    },
  },
});
