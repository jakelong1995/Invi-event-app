import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";

export const { signIn, signOut, auth } = NextAuth({
  providers: [Facebook],
});
