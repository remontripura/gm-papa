import config from "@/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.googleClientId as string,
      clientSecret: config.googleClientSecret as string,
      authorization: {
        params: {
          redirect_uri:`https://www.freefirebd.com/api/auth/callback/google`,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token && typeof account.id_token === "string") {
        token.id_token = account.id_token;
      } else if (!token.id_token) {
        token.id_token = null;
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token =
        typeof token.id_token === "string" ? token.id_token : null;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: config.nextAuthSecret,
});

export { handler as GET, handler as POST };
