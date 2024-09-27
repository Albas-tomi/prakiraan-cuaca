import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialProviders from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // CREDENTIAL
    CredentialProviders({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (
          email !== process.env.NEXT_PUBLIC_EMAIL ||
          password !== process.env.NEXT_PUBLIC_PASSWORD
        ) {
          return null;
        }

        return {
          id: "1",
          email: email,
        };
      },
    }),

    // GOOGLE
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_SECRET as string,
    }),
  ],

  callbacks: {
    // CALLBACK JWT UNTUK MEMASUKKAN DATA USER KE TOKEN
    async jwt({ token, user, account }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.email = user.email;
        token.fullname = user.fullname;
        token.id = user.id;
        token.image = user.image;
      }

      if (account?.provider === "google") {
        // data user google'
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("id" in token) {
        session.user.id = token.id;
      }
      // buat access token
      const accessToken = jwt.sign(
        token,
        process.env.NEXTAUTH_SECRET as string
      );
      session.accessToken = accessToken;
      return session;
    },
  },
  // Halaman Login Yang di render
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
